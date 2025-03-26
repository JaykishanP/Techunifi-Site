const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Add this at the top
const { google } = require('googleapis');
const { Readable } = require('stream');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = ['https://www.techunifi.com']; // Add allowed frontend origins here

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: Origin not allowed'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '20mb' })); // Adjust size as needed
app.use(express.urlencoded({ limit: '20mb', extended: true }));


// Decode base64 credentials
const emailUser = Buffer.from(process.env.EMAIL_USER_BASE64, 'base64').toString('utf-8');
const emailPass = Buffer.from(process.env.EMAIL_PASS_BASE64, 'base64').toString('utf-8');

console.log('Email User:', emailUser);
console.log('Email Pass Length:', emailPass.length);


// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8')),
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Constants
const SPREADSHEET_ID = '1Zm7ELsVKDi2w4TlZbs0b-kSIOjiPdWr9oWqmV8-Va0I'; // Replace with your spreadsheet ID
const SHEET_NAME = 'Timesheet';

// Function to append data to Google Sheet
const appendToSheet = async (spreadsheetId, data) => {
  try {
    console.log('Appending data:', data); // Log data being appended
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:J`, // Adjusted range
      valueInputOption: 'USER_ENTERED',
      resource: { values: [data] },
    });
    console.log('Append response:', response.data); // Log the response
    console.log('Data appended successfully!');
  } catch (error) {
    console.error('Error appending data to Google Sheet:', error.response?.data || error.message);
    throw new Error('Failed to append data to Google Sheet');
  }
};

// Function to upload a file to Google Drive
const uploadFileToDrive = async (fileName, base64File, mimeType) => {
  try {
    const drive = google.drive({ version: 'v3', auth });

    // Convert buffer to readable stream
    const buffer = Buffer.from(base64File, 'base64');
    const stream = Readable.from(buffer);

    const fileMetadata = { name: fileName };
    const media = { mimeType, body: stream };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    return `https://drive.google.com/file/d/${fileId}/view`;
  } catch (error) {
    console.error('Google Drive API Error:', error.response?.data || error.message);
    throw new Error('Failed to upload file to Google Drive');
  }
};


// Function to send an email
const sendEmail = async (data) => {
  const mailOptions = {
    from: emailUser,
    to: emailUser,
    subject: 'New Timesheet Submission',
    text: `A new timesheet entry has been submitted:\n\n
      Name: ${data[0]}\n
      Property: ${data[1]}\n
      Description: ${data[2]}\n
      Date: ${data[3]}\n
      Travel Hours: ${data[4]}\n
      Labor Hours: ${data[5]}\n
      Time In: ${data[6]}\n
      Time Out: ${data[7]}\n
      Receipt: ${data[8] || 'No receipt attached'}\n
      File Link: ${data[9] || 'No file uploaded'}\n\n
      Please review the submission.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};


// API Endpoint to handle form submission
app.post('/submit-timesheet', async (req, res) => {
  try {
    const {
      userName, propertyName, description, date,
      travelHours, laborHours, timeIn, timeOut, receipt, fileAttach,
    } = req.body;

    if (!userName || !propertyName || !description || !date || !travelHours || !laborHours || !timeIn || !timeOut) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    let fileLink = '';
    if (fileAttach) {
      const fileName = `Receipt_${Date.now()}.png`;
      const mimeType = 'image/png';
      fileLink = await uploadFileToDrive(fileName, fileAttach, mimeType);
    }

    const data = [userName, propertyName, description, date, travelHours, laborHours, timeIn, timeOut, receipt || '', fileLink || ''];
    await appendToSheet(SPREADSHEET_ID, data);
    
    // Send email notification
    await sendEmail(data);

    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Preflight OPTIONS handling (optional but recommended)
app.options('/submit-timesheet', cors());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
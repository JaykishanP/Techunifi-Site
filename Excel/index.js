const express = require('express');
const cors = require('cors');
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

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8')),
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Constants
const SPREADSHEET_ID = '17xp08DNwal5DTc2pd8I8x-a1TQCQZZr_Oy882MIu_TU'; // Replace with your spreadsheet ID
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

// API Endpoint to handle form submission
app.post('/submit-timesheet', async (req, res) => {
  try {
    const {
      userName,
      propertyName,
      description,
      date,
      travelHours,
      laborHours,
      timeIn,
      timeOut,
      receipt,
      fileAttach,
    } = req.body;

    // Validate inputs
    if (
      !userName ||
      !propertyName ||
      !description ||
      !date ||
      !travelHours ||
      !laborHours ||
      !timeIn ||
      !timeOut ||
      (receipt && !fileAttach)
    ) {
      return res
        .status(400)
        .json({ error: 'All required fields must be filled, and file must be attached if receipt is filled.' });
    }

    let fileLink = '';
    if (fileAttach) {
      const fileName = `Receipt_${Date.now()}.png`; // Example filename
      const mimeType = 'image/png'; // Adjust MIME type as needed
      fileLink = await uploadFileToDrive(fileName, fileAttach, mimeType);
    }

    const data = [
      userName,
      propertyName,
      description,
      date,
      travelHours,
      laborHours,
      timeIn,
      timeOut,
      receipt || '',
      fileLink || '',
    ];

    const dataToAppend = [data]; // Wrap data array inside another array
    await appendToSheet(SPREADSHEET_ID, dataToAppend);
    // await appendToSheet(SPREADSHEET_ID, data);

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

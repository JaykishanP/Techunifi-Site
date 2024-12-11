const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'https://www.techunifi.com/', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// Verify GOOGLE_CREDENTIALS_BASE64 exists
if (!process.env.GOOGLE_CREDENTIALS_BASE64) {
    console.error('Error: GOOGLE_CREDENTIALS_BASE64 environment variable is missing!');
    process.exit(1);
}

// Decode Base64 credentials and create a temporary JSON file
const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_BASE64;
const credentialsPath = path.join(__dirname, 'credentials.json');
try {
    fs.writeFileSync(credentialsPath, Buffer.from(credentialsBase64, 'base64').toString('utf8'));
} catch (err) {
    console.error('Error writing credentials file:', err.message);
    process.exit(1);
}

// Google APIs setup
const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
});
const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

// Define constants
let SPREADSHEET_ID = ''; // This will be dynamically set
const SHEET_NAME = 'Timesheet';
const DRIVE_FOLDER_ID = '1gmOgHwekz3DPJR-nbrJXo527MEJ0V4mv'; // Replace with your Google Drive folder ID

// Function to create a new Google Sheet in a specific Drive folder
const createNewSheetInDrive = async () => {
    try {
        // Create a new Google Sheet
        const sheetResponse = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: 'New Timesheet',
                },
                sheets: [
                    {
                        properties: {
                            title: SHEET_NAME,
                        },
                    },
                ],
            },
        });

        const newSpreadsheetId = sheetResponse.data.spreadsheetId;

        // Move the new sheet to the specified folder in Google Drive
        await drive.files.update({
            fileId: newSpreadsheetId,
            addParents: DRIVE_FOLDER_ID,
            removeParents: '',
            fields: 'id, parents',
        });

        console.log(`Spreadsheet created and moved to Drive folder: ${newSpreadsheetId}`);
        return newSpreadsheetId;
    } catch (error) {
        console.error('Error creating or moving spreadsheet:', error.response?.data || error.message);
        throw new Error('Failed to create or move the spreadsheet');
    }
};

// Function to append data to Google Sheet
const appendToSheet = async (spreadsheetId, data) => {
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_NAME}!A:F`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [data],
            },
        });
        console.log('Data appended successfully!');
    } catch (error) {
        console.error('Error appending data to Google Sheet:', error.response?.data || error.message);
        throw new Error('Failed to append data to Google Sheet');
    }
};

// API Endpoint to handle form submission
app.post('/submit-timesheet', async (req, res) => {
    try {
        const { userName, propertyName, description, timeIn, timeOut, date } = req.body;

        // Validate input
        if (!userName || !propertyName || !description || !timeIn || !timeOut || !date) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const data = [userName, propertyName, description, timeIn, timeOut, date];

        // If SPREADSHEET_ID is not set, create a new sheet in Google Drive
        if (!SPREADSHEET_ID) {
            SPREADSHEET_ID = await createNewSheetInDrive();
        }

        // Append data to the newly created or existing Google Sheet
        await appendToSheet(SPREADSHEET_ID, data);

        res.json({
            message: 'Form submitted successfully!',
            spreadsheetId: SPREADSHEET_ID,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Clean up temporary credentials file on exit
process.on('exit', () => {
    if (fs.existsSync(credentialsPath)) {
        fs.unlinkSync(credentialsPath);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

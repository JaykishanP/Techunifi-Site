const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = '1fxHplmfWgWn6bQaPfkR4kUGs34TGX_8f'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'timesheet'; // Replace with your sheet name

// Endpoint to handle form submission
app.post('/submit-timesheet', async (req, res) => {
    try {
        const { userName, propertyName, description, timeIn, timeOut, date } = req.body;

        if (!userName || !propertyName || !description || !timeIn || !timeOut || !date) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const values = [[userName, propertyName, description, timeIn, timeOut, date]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:E`,
            valueInputOption: 'USER_ENTERED',
            resource: { values },
        });

        return res.status(200).json({
            message: 'Data submitted successfully!',
            driveLink: `https://drive.google.com/drive/folders/1gmOgHwekz3DPJR-nbrJXo527MEJ0V4mv`,
        });
    } catch (error) {
        console.error('Error appending data to Google Sheet:', error);
        return res.status(500).json({ error: 'Failed to append data to Google Sheet' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

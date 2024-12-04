const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
 
require('dotenv').config();
 
const app = express();
const port = 3000;
 
app.use(cors());
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
 
const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});
 
const drive = google.drive({ version: 'v3', auth });
 
const uploadToGoogleDrive = async (filePath, fileName) => {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
 
    const fileMetadata = {
        name: fileName,
        parents: ['1gmOgHwekz3DPJR-nbrJXo527MEJ0V4mv'], // Replace with your Google Drive folder ID
    };
 
    const media = {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        body: fs.createReadStream(filePath),
    };
 
    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
    });
 
    return response.data;
};
 
app.post('/submit-timesheet', async (req, res) => {
    try {
        const { userName, propertyName, description, timeIn, timeOut, date } = req.body;
 
        // Validate input
        if (!userName || !propertyName || !description || !timeIn || !timeOut || !date) {
            return res.status(400).json({ error: 'All fields are required!' });
        }
 
        // Generate Excel file locally
        const filePath = path.join(__dirname, 'timesheet.xlsx');
        const fileName = 'timesheet.xlsx';
        const workbook = xlsx.utils.book_new();
        const worksheetData = [
            ['userName', 'Property Name', 'Description', 'Time In', 'Time Out', 'Date'],
            [userName, propertyName, description, timeIn, timeOut, date],
        ];
        const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Timesheet');
        xlsx.writeFile(workbook, filePath);
 
        // Upload the file to Google Drive
        const driveResponse = await uploadToGoogleDrive(filePath, fileName);
        console.log(`File uploaded successfully! File ID: ${driveResponse.id}, Web View Link: ${driveResponse.webViewLink}`);
 
        // Clean up local file
        fs.unlinkSync(filePath);
 
        res.send({
            message: 'Form submitted successfully!',
            driveLink: driveResponse.webViewLink,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({ error: error.message });
    }
});
 
// Clean up temporary credentials file on exit
process.on('exit', () => {
    if (fs.existsSync(credentialsPath)) {
        fs.unlinkSync(credentialsPath);
    }
});
 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

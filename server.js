// CMD
// node server.js

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Correo enviado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error enviando correo', error });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

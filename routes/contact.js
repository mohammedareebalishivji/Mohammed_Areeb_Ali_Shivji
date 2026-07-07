import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (process.env.CONTACT_EMAIL && process.env.CONTACT_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio message from ${name}`,
        html: `
          <h3>New message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    res.json({ success: true, message: 'Message received. Thank you!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

export default router;

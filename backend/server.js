
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174'

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json({ limit: '20kb' }))

// MongoDB Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
  message: { type: String, required: true, trim: true, maxlength: 2000 }
}, { timestamps: true })

const ContactMessage = mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', messageSchema)

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API is running.'
  })
})

// Contact Form API
app.post('/api/contact', async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : ''
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : ''
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : ''

  if (name.length < 2 || name.length > 80) {
    return res.status(400).json({
      message: 'Please enter a valid name.'
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return res.status(400).json({
      message: 'Please enter a valid email address.'
    })
  }

  if (message.length < 10 || message.length > 2000) {
    return res.status(400).json({
      message: 'Message must be between 10 and 2000 characters.'
    })
  }

  try {
    if (!process.env.MONGODB_URI) {
      return res.status(503).json({
        message: 'MongoDB is not configured.'
      })
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI)
    }

    // Save message in MongoDB
    await ContactMessage.create({ name, email, message })

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Portfolio Message from ${name}`,
          text: `
New message received from your portfolio!

Name: ${name}
Email: ${email}

Message:
${message}
          `
        })

        console.log('Email sent successfully!')
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message)
      }
    }

    return res.status(201).json({
      message: 'Thanks! Your message was saved successfully.'
    })

  } catch (error) {
    console.error('Contact form error:', error.message)

    return res.status(500).json({
      message: 'Message could not be saved right now.'
    })
  }
})

// Start Server
app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`)
})

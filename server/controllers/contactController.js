async function contact(req, res, next) {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    // In production, send via email service (Nodemailer, SendGrid, etc.)
    // For now, acknowledge receipt
    res.json({ message: 'Message received. We will be in touch shortly.' })
  } catch (err) {
    next(err)
  }
}

module.exports = { contact }

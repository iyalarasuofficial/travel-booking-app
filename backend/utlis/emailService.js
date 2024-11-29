import nodemailer from 'nodemailer';

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other email provider here
  auth: {
    user: process.env.EMAIL_USER, // Add your email here
    pass: process.env.EMAIL_PASSWORD // Add your email password here
  }
});

// Function to send an email
export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Receiver address
      subject: 'Booking Confirmation', // Subject line
      text: `Your booking has been confirmed! Details:\n${JSON.stringify(bookingDetails)}`,
      html: `<p>Your booking has been confirmed!</p><p>Details: ${JSON.stringify(bookingDetails)}</p>`
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

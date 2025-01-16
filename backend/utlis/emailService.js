import nodemailer from 'nodemailer';

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other email provider here
  auth: {
    user: process.env.EMAIL_USER, // Add your email here
    pass: process.env.EMAIL_PASSWORD // Add your email password here
  }
});
export const sendPasswordResetConfirmationEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Receiver address
      subject: 'Your Password Has Been Reset', // Subject line
      html: `<p>Your password has been successfully reset. If you didn't request this change, please contact support immediately.</p>`
    });
    console.log('Password reset confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
    throw error;
  }
};


// Function to send a password reset email
export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Receiver address
      subject: 'Password Reset Request', // Subject line
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset your password</a></p>`
    });
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Function to send a booking confirmation email
export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Receiver address
      subject: 'Booking Confirmation', // Subject line
      html: `
        <h3>Your Booking is Confirmed!</h3>
        <p>Hi ${bookingDetails.name},</p>
        <p>Thank you for booking with us. Here are your booking details:</p>
        <ul>
          <li><strong>Destination:</strong> ${bookingDetails.destination}</li>
          <li><strong>Travel Date:</strong> ${new Date(bookingDetails.travelDate).toLocaleDateString()}</li>
          <li><strong>Number of Guests:</strong> ${bookingDetails.numberOfGuests}</li>
          <li><strong>Total Cost:</strong> $${bookingDetails.totalCost}</li>
        </ul>
        <p>We look forward to seeing you soon!</p>
      `,
    });
    console.log('Booking confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};
export const sendWelcomeEmail = async (email, username) => {
  try {
    const subject = 'Welcome to Tripify!';
    const html = `
      <h1>Welcome to Tripify, ${username}!</h1>
      <p>Thank you for registering on our platform. We're excited to help you plan amazing trips and adventures.</p>
      <p>Here are a few things you can do next:</p>
      <ul>
        <li>Explore popular destinations</li>
        <li>Book your next trip with ease</li>
        <li>Get personalized recommendations</li>
      </ul>
      <p>Visit our site to get started: <a href="${process.env.CLIENT_URL}">${process.env.CLIENT_URL}</a></p>
      <p>Happy Travels,</p>
      <p>The Tripify Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });

    console.log('Welcome email sent successfully to', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

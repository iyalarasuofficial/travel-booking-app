

---

# Travel Booking Website

## Overview
The **Travel Booking Website** is a full-stack application that allows users to explore destinations, book tours, and manage their trips. It integrates a responsive frontend with robust backend APIs to deliver a seamless travel planning experience.

---

## Features
- **User Authentication**: Secure login and registration.
- **Destination Search**: Browse and filter destinations based on preferences.
- **Tour Booking**: Book tours with real-time price calculations.
- **User Dashboard**: View and manage bookings.
- **Admin Panel**: Manage destinations, bookings, and users.
- **Responsive Design**: Optimized for all devices.

---

## Tech Stack
### Frontend
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Vite.js**: For a fast development environment.

### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For handling API requests.
- **MongoDB**: For database management.
- **Mongoose**: For database modeling.

### Tools
- **Postman**: For API testing.
- **Git/GitHub**: For version control and collaboration.

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/travel-booking-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd travel-booking-app
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Create a `.env` file in the `backend` and `frontend` directories and configure the environment variables:
   - Backend `.env`:
     ```
     PORT=5000
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend `.env`:
     ```
     VITE_BASE_URL=http://localhost:5000
     ```

5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

7. Open the app in your browser:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Folder Structure

### Frontend
```
frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── styles/
  │   ├── utils/
  │   └── main.jsx
  ├── .env
  ├── package.json
  └── tailwind.config.js
```

### Backend
```
backend/
  ├── config/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── utils/
  ├── server.js
  ├── .env
  └── package.json
```

---

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - User login.

### Booking Routes
- `GET /api/bookings` - Get all bookings.
- `POST /api/bookings` - Create a booking.

### Destination Routes
- `GET /api/destinations` - Fetch all destinations.
- `POST /api/destinations` - Add a new destination.

---

## Contributions
Contributions are welcome! Fork the repository and create a pull request.

---

## License
This project is licensed under the MIT License.

---
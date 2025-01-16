const ApiRoutes = {
  LOGIN: {
    path: "/api/auth",  // Endpoint for login
    authenticate: true,  // Example: specify if authentication is needed
  },
  SIGNUP: {
    path: "/api/users",  // Endpoint for sign up
    authenticate: false,  // Example: specify if authentication is needed
  },
  
  FETCH_DESTINATIONS: {
    path: "/api/destinations",  // Base path for fetching destinations
    authenticate: false,  // No authentication required
  },
  GET_USER_INFO_BY_ID: {
    path: '/api/users',  // Example API route with a dynamic user ID
    authenticate: true,  // Indicates this route requires authentication
  },
  FETCH_DESTINATION_BY_ID: {
    path: "/api/destinations",  // Base path for destination, ID will be appended dynamically
    authenticate: false,
  }, FETCH_REVIEWS: {
    path: "/api/reviews/destination",  // Base path for reviews, destinationId will be appended dynamically
    authenticate: false,
  },
  ADD_REVIEW: {
    path: "/api/reviews",  // Endpoint for posting a new review
    authenticate: true,
  },
  BOOKING_SUMBIT: {
    path: "/api/BOOKINGS",  // Endpoint for posting a new review
    authenticate: true,
  },
  
  GET_BOOKINGS_BY_USER_ID: {
    path: "/api/bookings/id",  // Endpoint for posting a new review
    authenticate: true,
  },
  UPDATE_USER: {
    path: "/api/users",  // Endpoint for updating user info
    authenticate: true,
  }, FORGOT_PASSWORD: {
    path: '/api/auth/forgot-password',  // Define the correct API route for forgot password
    authenticate: false
  },  RESET_PASSWORD: {
    path: '/api/auth/reset-password',
    authenticate: true, // Whether this route needs authentication or not
  },
};

export default ApiRoutes;

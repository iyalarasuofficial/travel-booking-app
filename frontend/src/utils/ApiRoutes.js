const ApiRoutes = {
    LOGIN: {
      path: "/api/auth",  // Endpoint for login
      authenticate: true,  // Example: specify if authentication is needed
    },
    SIGNUP: {
      path: "/api/users",  // Endpoint for sign up
      authenticate: false,  // Example: specify if authentication is needed
    },
  
  };
  
  export default ApiRoutes;
  
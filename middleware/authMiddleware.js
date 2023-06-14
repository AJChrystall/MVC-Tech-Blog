// authMiddleware.js

const requireAuth = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect to the login page or send an error response
      res.redirect('/login'); // Replace '/login' with the appropriate route for your application
    }
  };
  
  module.exports = { requireAuth };
  
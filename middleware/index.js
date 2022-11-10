function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) { // if user is logged in
    return next(); // allow the next route to run
  } else { 
    var err = new Error('You must be logged in to view this page.'); // create error
    err.status = 401; // set error status
    return next(err); // pass error to next middleware
  }
}
module.exports.loggedOut = loggedOut; // export loggedOut function
module.exports.requiresLogin = requiresLogin; // export requiresLogin function

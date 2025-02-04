// const checkRoles = (...roles) => {
//   return (req, res, next) => {
//     // console.log(roles); //route ko parameter lai array ma banauxa with ... rest operator
//     // console.log(req.user); //isAuthenticated bata aako pass gareko
//     const userRole = req.user.role;
//     if (!roles.includes(userRole)) {
//       res.status(403).json({
//         message: "Forbidden Access to this .Only admin access",
//       });
//     }
//     // req.user = req.user.id;
//     next();
//   };
// };

// module.exports = checkRoles;
const checkRoles = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }
    next();
  };
};

module.exports = checkRoles;

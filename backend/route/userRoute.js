const {
  getUsers,
  deleteUser,
  getUser,
  addUser,
  loginUser,
  editUser,
  getAdminDashboard,
} = require("../controller/user/userController");
const checkRoles = require("../middleware/checkRoles");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../service/catchAsync");

const router = require("express").Router();

router
  .route("/users")
  .get(isAuthenticated, checkRoles("admin"), catchAsync(getUsers))
  .post(catchAsync(addUser));

router.route("/login").post(catchAsync(loginUser));

router
  .route("/users/:id")
  .delete(isAuthenticated, checkRoles("admin"), catchAsync(deleteUser))
  .patch(isAuthenticated, checkRoles("admin"), catchAsync(editUser))
  .get(isAuthenticated, checkRoles("admin"), catchAsync(getUser));

router.get("/admin", isAuthenticated, checkRoles("admin"), getAdminDashboard);
router.get("/admin/login", loginUser);

module.exports = router;
//admin route missing in backend will fix this in future

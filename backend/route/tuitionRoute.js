const {
  getTuitions,
  addTuition,
  deleteTuition,
  getTuition,
  editTuition,
  applyToTuition,
} = require("../controller/user/tuition/tuitionController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../service/catchAsync");
const checkRoles = require("../middleware/checkRoles");

const router = require("express").Router();

router.route("/").get(catchAsync(getTuitions));

router
  .route("/tuitions")
  .get(catchAsync(getTuitions))
  .post(isAuthenticated, checkRoles("admin"), catchAsync(addTuition));

router
  .route("/tuitions/:id")
  .delete(isAuthenticated, checkRoles("admin"), catchAsync(deleteTuition))
  .patch(isAuthenticated, checkRoles("admin"), catchAsync(editTuition))
  .get(catchAsync(getTuition));

router.post("/tuitions/:id/apply", isAuthenticated, applyToTuition);
module.exports = router;

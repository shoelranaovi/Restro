const express = require("express");
const {
  getAlluser,
  updateUserbyadmin,
  deleteuser
} = require("../controller/admin.controller");
const verifyUser = require("../middleware/verifyuser");
const RoleCheck = require("../middleware/isAdmin");
const router = express.Router();

router.get("/getAlluser", verifyUser, RoleCheck("Admin"), getAlluser);
router.post("/update/:id", verifyUser, RoleCheck("Admin"), updateUserbyadmin);
router.delete("/delete/:id", verifyUser, RoleCheck("Admin"), deleteuser);

module.exports = router;

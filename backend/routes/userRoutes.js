<<<<<<< HEAD
const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {registerUser,authUser, allUsers} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect, allUsers);

router.post('/login',authUser);

module.exports = router;
=======
const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
>>>>>>> fedf8033f683436a7b02fcb39217e7ba4af00de5

<<<<<<< HEAD
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {sendMessage, allMessages} = require("../controllers/messageControllers")
const router = express.Router();

router.route('/:chatId').get(protect,allMessages);
router.route('/').post(protect,sendMessage);

module.exports = router;
=======
const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
>>>>>>> fedf8033f683436a7b02fcb39217e7ba4af00de5

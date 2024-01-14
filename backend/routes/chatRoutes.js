<<<<<<< HEAD
const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {accessChat, fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup} = require("../controllers/chatControllers");

const router = express.Router();
router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);

router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupadd").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeFromGroup);

module.exports = router;
=======
const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
>>>>>>> fedf8033f683436a7b02fcb39217e7ba4af00de5

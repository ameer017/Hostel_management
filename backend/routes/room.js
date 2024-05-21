const express = require("express");
const {createNewRoom, getAllRoom, getRoom, updateRoom, deleteRoom} = require("../controllers/roomController")



const router = express.Router();

router.post("/create-room", createNewRoom);
router.get("/get-all-room", getAllRoom);
router.get("/get-single-room/:roomId", getRoom);
router.patch("/update-room/:roomId", updateRoom);
router.delete("/delete/:roomId", deleteRoom);

module.exports = router;

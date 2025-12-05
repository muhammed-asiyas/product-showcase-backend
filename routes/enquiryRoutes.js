const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

router.post("/", enquiryController.createEnquiry);
router.get("/admin/all", enquiryController.getEnquiries);
router.delete("/:id", enquiryController.deleteEnquiry);

module.exports = router;

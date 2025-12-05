const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

router.post("/", enquiryController.createEnquiry);

// Admin route
router.get("/admin/all", enquiryController.getEnquiries);

module.exports = router;

const express = require("express");
const router = express.Router();
const CleaningService = require("../controllers/cleaningServiceController");

// router create service

router.post("/api/cleaningService", CleaningService.createCleaningService);

// Route to get all services

router.get("/api/cleaningService", CleaningService.getAllCleaningServices);

// Route to get a specific service by ID
router.get(
  "/api/cleaningService/:id",
  CleaningService.getCleaningServiceById
);

// Route to update a service by ID
router.put(
  "/api/cleaningService/:id",
  CleaningService.updateCleaningServiceById
);

// Route to delete a service by ID
router.delete(
  "/api/cleaningService/:id",
  CleaningService.deleteCleaningServiceById
);

module.exports = router;

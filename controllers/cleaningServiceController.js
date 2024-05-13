const CleaningService = require("../model/cleaningService");
// Create a new cleaning service
const createCleaningService = async (req, res) => {
  try {

    const { title, description, image, price } = req.body;
    const newCleaningService = new CleaningService({
      title,
      description,
      image,
      price,

    });
    const savedCleaningService = await newCleaningService.save();

    res.status(201).json(savedCleaningService);
  } catch (error) {
    console.error("Error creating cleaning service:", error);
    res.status(500).json({ errors });
  }
};

// Get all cleaning services
const getAllCleaningServices = async (req, res) => {
  try {
    const cleaningServices = await CleaningService.find();
    res.status(200).json(cleaningServices);
  } catch (error) {
    console.error("Error getting cleaning services:", error);
    res.status(500).json({ error: "Error getting cleaning services" });
  }
};

// Get a specific cleaning service by ID
const getCleaningServiceById = async (req, res) => {
  try {
    const cleaningServiceId = req.params.id;
    console.log(cleaningServiceId)
    const cleaningService = await CleaningService.findById(cleaningServiceId);
    if (!cleaningService) {
      res.status(404).json({ message: "Cleaning service not found" });
    } else {
      res.status(200).json(cleaningService);
    }
  } catch (error) {
    console.error("Error getting cleaning service:", error);
    res.status(500).json({ error: "Error getting cleaning service" });
  }
};

// Update a cleaning service by ID
const updateCleaningServiceById = async (req, res) => {
  try {
    const cleaningServiceId = req.params.id;
    const { serviceName, description, price } = req.body;

    const updatedCleaningService = await CleaningService.findByIdAndUpdate(
      cleaningServiceId,
      { serviceName, description, price },
      { new: true }
    );

    if (!updatedCleaningService) {
      res.status(404).json({ message: "Cleaning service not found" });
    } else {
      res.status(200).json(updatedCleaningService);
    }
  } catch (error) {
    console.error("Error updating cleaning service:", error);
    res.status(500).json({ error: "Error updating cleaning service" });
  }
};

// Delete a cleaning service by ID
const deleteCleaningServiceById = async (req, res) => {
  try {
    const cleaningServiceId = req.params.id;
    const deletedCleaningService = await CleaningService.findByIdAndDelete(
      cleaningServiceId
    );
    if (!deletedCleaningService) {
      res.status(404).json({ message: "Cleaning service not found" });
    } else {
      res.status(200).json(deletedCleaningService);
    }

  } catch (error) {
    console.error("Error deleting cleaning service:", error);
    res.status(500).json({ error: "Error deleting cleaning service" });
  }
};

module.exports = {
  createCleaningService,
  getAllCleaningServices,
  getCleaningServiceById,
  updateCleaningServiceById,
  deleteCleaningServiceById,
};

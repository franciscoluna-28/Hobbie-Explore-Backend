import express, { Router } from "express";
import CustomActivityController from "./controllers/custom-activity-controller";

const customActivityRouter: Router = express.Router();
const customActivityController = new CustomActivityController();

// Define RESTful routes for custom activities
customActivityRouter.post("/custom-activities", customActivityController.addCustomActivity);
customActivityRouter.delete("/custom-activities/:id", customActivityController.deleteCustomActivity);

export default customActivityRouter;

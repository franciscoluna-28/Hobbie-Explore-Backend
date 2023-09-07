import { Request, Response } from "express";
import CustomActivityActions from "../repositories/custom-activity-actions";
class CustomActivityController {
  private customActivityActions: CustomActivityActions;

  constructor() {
    this.customActivityActions = new CustomActivityActions();

    // Bind the class methods to the instance of the class
    this.addCustomActivity = this.addCustomActivity.bind(this);
    this.deleteCustomActivity = this.deleteCustomActivity.bind(this);
    this.getUserActivities = this.getUserActivities.bind(this);
  }

  async addCustomActivity(req: Request, res: Response) {
    const { body } = req;

    try {
      // Remove uid from the request body before passing it to addCustomActivity
      const { ...activityData } = body;
      const { userUID } = activityData;

      const savedActivity = await this.customActivityActions.addCustomActivity(
        activityData,
        userUID
      );

      console.log(savedActivity);

      if (savedActivity) {
        return res.status(201).json(savedActivity);
      } else {
        return res.status(500).json({ error: "Failed to add custom activity" });
      }
    } catch (error) {
      console.error("Error adding custom activity:", error); // Log the error for debugging
      return res.status(500).json({ error: "Error adding custom activity" });
    }
  }

  async deleteCustomActivity(req: Request, res: Response) {
    const { id, user } = req.body; // Use req.user directly
    const { uid } = user; // Assuming you have user information in req.user

    try {
      const deleted =
        await this.customActivityActions.deleteCustomActivityFromDatabase(
          id,
          uid
        );

      if (deleted) {
        return res
          .status(200)
          .json({ message: "Custom activity deleted successfully" });
      } else {
        return res
          .status(403)
          .json({ error: "Unauthorized to delete this custom activity" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error deleting custom activity" });
    }
  }
  async getUserActivities(req: Request, res: Response) {
    const { uid } = req.params;
    const { page } = req.query;
    console.log(page)
    const limit = 10;
  
    try {
      // Validate and parse the page number
      const pageNumber = parseInt(page as string, 10) || 1;
  
      const paginatedActivities = await this.customActivityActions.getUserActivities(
        uid,
        pageNumber,
        limit
      );
  
      return res.status(200).json(paginatedActivities);
    } catch (error) {
      console.error("Error getting user activities:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting user activities" });
    }
  }
  
  
  
  
  
  
}
  
export default CustomActivityController;

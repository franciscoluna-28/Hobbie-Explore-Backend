import { Request, Response } from "express";
import { UserActivityRepository } from "../repository/userActivityRepository";
import { Model } from "mongoose";
import { IUser } from "../../../types/userTypes";
import { HobbieExploreActivityWihtImage } from "../../../types/activityTypes";

export class UserActivitiesController {
  private static instance: UserActivitiesController;
  private userActivityRepository: UserActivityRepository;

  private constructor(userModel: Model<IUser>) {
    this.userActivityRepository = new UserActivityRepository(userModel);
    this.deleteActivityFromUser = this.deleteActivityFromUser.bind(this);
    this.addActivityToUser = this.addActivityToUser.bind(this);
    this.getUserHobbyExploreActivitiesIDs =
      this.getUserHobbyExploreActivitiesIDs.bind(this);
    this.getUserHobbyExploreActivities =
      this.getUserHobbyExploreActivities.bind(this);
  }

  static getInstance(userModel: Model<IUser>): UserActivitiesController {
    if (!UserActivitiesController.instance) {
      UserActivitiesController.instance = new UserActivitiesController(
        userModel
      );
    }
    return UserActivitiesController.instance;
  }

  /**
   *@param {Request}req - The Express request object containing the user ID and activity ID to be deleted.
   * @param {Response} res - The Express response object to send the response.
   * @returns {Promise<void>} A Promise that resolves to void.
   * @throws {Error} If the user activity deletion operation fails.
   * *  @example
   *  Request
   *
   *
   *  Response
   *  Status: 200 OK
   *
   *  "success": true,
   *  "message": "Activity successfully deleted."
   *
   */

  // Only the own user can delete activities
  // Removes a specific default activity of Hobby Explore from a user and retrieves the updated list of remaining activities
  async deleteActivityFromUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid, activityId } = req.params;

      const result = await this.userActivityRepository.deleteActivityFromUser(
        uid,
        activityId
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting user activity:", error);
      res.status(500).json({ error: "Failed to delete user activity" });
    }
  }

  // Function to add one default activity from Hobby Explore to the user
  async addActivityToUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const activityData: HobbieExploreActivityWihtImage = req.body;

      const result =
        await this.userActivityRepository.addActivityToUserAndDatabase(
          uid,
          activityData
        );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(409).json(result);
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      res.status(500).json({
        error: "An error occurred while adding a new activity to the user",
      });
    }
  }

  // Helper function to be used in the frontend
  async getUserHobbyExploreActivitiesIDs(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { uid } = req.params;

      const result =
        await this.userActivityRepository.getUserSavedActivitiesIds(uid);

      if ("error" in result) {
        res.status(404).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error getting user's saved activity IDs:", error);
      res.status(500).json({
        error: "An error occurred while getting user's saved activity IDs",
      });
    }
  }

  // Function to retrieve all the activities from Hobby Explore
  async getUserHobbyExploreActivities(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { uid } = req.params;
      const page: number = Number(req.query.page) ?? 1;

      const result = await this.userActivityRepository.getUserActivities(
        uid,
        page
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving user activities:", error);
      res.status(500).json({
        error: "An error occurred while retrieving user activities",
      });
    }
  }
}

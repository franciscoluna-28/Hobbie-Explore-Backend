import DefaultActivityUserActionsRepository from "../repository/default-activities-user-actions-repository";
import { Request, Response } from "express";
import { findUserByUid } from "../../../../helpers/userRepositoryHelper";
import { IUser } from "../../../../types/userTypes";
import { Model } from "mongoose";
import { PaginationRequest } from "../../../../middlewares/pagination-middleware";
import {
  DefaultActivityRepository,
  GlobalDefaultActivityRepository,
} from "../repository/default-activity-repository";
import UserModel from "../../../user/userModel";

// Use dependency injection to keep things organized
export class DefaultActivitiesUserController {
  private activityRepository: DefaultActivityRepository;
  private userActivityActions: DefaultActivityUserActionsRepository;

  constructor() {
    this.activityRepository = GlobalDefaultActivityRepository;
    this.userActivityActions =
      this.activityRepository.getDefaultUserActivityActionsRepository();

    // Bind methods to the instance to maintain the correct "this" context
    this.deleteActivityFromUser = this.deleteActivityFromUser.bind(this);
    this.addActivityToUser = this.addActivityToUser.bind(this);
    this.getUserHobbyExploreActivities =
      this.getUserHobbyExploreActivities.bind(this);
    this.checkIfActivityIsSaved = this.checkIfActivityIsSaved.bind(this);
  }

  async deleteActivityFromUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid, id } = req.params;

      const result = await this.userActivityActions.deleteActivityFromUser(
        uid,
        id
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting user activity:", error);
      res.status(500).json({ error: "Failed to delete user activity" });
    }
  }

  async addActivityToUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const { id } = req.body;

      const result = await this.userActivityActions.addActivityIdToUser(
        uid,
        id
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

  async getUserHobbyExploreActivities(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { uid } = req.params;

      const pageParam = req.query.page;
      const limitParam = req.query.limit;

      // Check if page and limit parameters are provided and valid numbers
      const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
      const limit =
        typeof limitParam === "string" ? parseInt(limitParam, 10) : 10;

      // Ensure that you've imported and defined this.userActivityActions somewhere
      const result = await this.userActivityActions.getUserActivities(
        uid,
        page,
        limit
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving user activities:", error);
      res.status(500).json({
        error: "An error occurred while retrieving user activities",
      });
    }
  }

  async checkIfActivityIsSaved(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const id = req.query.activityId as string;

      console.log("id is", id);

      const isSaved: boolean =
        await this.userActivityActions.checkIfActivityIsSavedByUser(uid, id);

      console.log(isSaved);

      res.status(200).json({ isSaved });
    } catch (error) {
      console.error("Error checking if activity is saved:", error);
      res.status(500).json({
        error: "An error occurred while checking if activity is saved",
      });
    }
  }
}

import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../../types/userTypes";
import { UserStatsRepository } from "../repository/userStatsRepository";

export class UserStatsController {
  private userStatsRepository: UserStatsRepository;

  constructor(userModel: Model<IUser>) {
    this.userStatsRepository = new UserStatsRepository(userModel);
    this.getFavoriteCategories = this.getFavoriteCategories.bind(this);
    this.getUserTotalStats = this.getFavoriteCategories.bind(this);
  }

  async getFavoriteCategories(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;

      const favoriteCategories =
        await this.userStatsRepository.getFavoriteCategories(uid);

      res.status(200).json(favoriteCategories);
    } catch (error) {
      console.error("Error retrieving favorite categories:", error);
      res.status(500).json({ error: "Failed to retrieve favorite categories" });
    }
  }

  async getUserTotalStats(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;

      const userTotalStats = await this.userStatsRepository.getUserTotalStats(
        uid
      );

      res.status(200).json(userTotalStats);
    } catch (error) {
      console.error("Error retrieving user total stats:", error);
      res.status(500).json({ error: "Failed to retrieve user total stats" });
    }
  }
}

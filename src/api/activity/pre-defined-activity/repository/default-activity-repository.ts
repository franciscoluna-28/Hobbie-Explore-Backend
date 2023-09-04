import { PaginateModel, Document, Model } from "mongoose";
import { DefaultActivityFromDB } from "./default-activities-db-repository";
import { DefaultRandomActivityRepository } from "./default-activities-random-repository";
import { IPredefinedActivity } from "../../../../types/activityTypes";
import DefaultActivityModel from "../default-activity-model";
import DefaultActivityUserActionsRepository from "./default-activities-user-actions-repository";
import UserModel from "../../../user/userModel";
import { IUser } from "../../../../types/userTypes";

/**
 * Repository class that aggregates different repositories related to predefined activities.
 * This class acts as a central point for accessing various predefined activity repositories.
 */
export class DefaultActivityRepository {
  private defaultActivityDBRepository: DefaultActivityFromDB;
  private defaultRandomActivityRepository: DefaultRandomActivityRepository;
  private defaultUserActivityActionsRepository: DefaultActivityUserActionsRepository;

  /**
   * Constructs a PredefinedActivityRepository instance.
   * @param activityModel The Mongoose model for predefined activities.
   * @param userModel The Mongoose model for users.
   */
  constructor(
    activityModel: PaginateModel<IPredefinedActivity & Document>,
    userModel: Model<IUser>
  ) {
    this.defaultActivityDBRepository = new DefaultActivityFromDB(activityModel);
    this.defaultRandomActivityRepository = new DefaultRandomActivityRepository(
      DefaultActivityModel
    );
    this.defaultUserActivityActionsRepository =
      new DefaultActivityUserActionsRepository(userModel);
  }

  /**
   * Gets the repository for interacting with predefined activities stored in the database.
   * @returns The DefaultActivityFromDB repository instance.
   */
  getDefaultActivityDBRepository(): DefaultActivityFromDB {
    return this.defaultActivityDBRepository;
  }

  /**
   * Gets the repository for fetching random predefined activities.
   * @returns The DefaultRandomActivityRepository repository instance.
   */
  getDefaultRandomActivityRepository(): DefaultRandomActivityRepository {
    return this.defaultRandomActivityRepository;
  }

  /**
   * Gets the repository for user-related actions on predefined activities.
   * @returns The DefaultActivityUserActionsRepository repository instance.
   */
  getDefaultUserActivityActionsRepository(): DefaultActivityUserActionsRepository {
    return this.defaultUserActivityActionsRepository;
  }
}

/**
 * Global instance of PredefinedActivityRepository to be used across the application.
 */
export const GlobalDefaultActivityRepository = new DefaultActivityRepository(
  DefaultActivityModel,
  UserModel
);

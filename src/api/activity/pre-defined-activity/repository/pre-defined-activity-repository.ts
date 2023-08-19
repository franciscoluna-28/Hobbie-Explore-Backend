import { PaginateModel, Document } from "mongoose";
import { PredefinedActivityDBRepository } from "./pre-defined-activity-db-repository";
import { PredefinedRandomActivityRepository } from "./pre-defined-random-activity-repository";
import { IPredefinedActivity } from "../../../../types/activityTypes";
import PredefinedActivityModel from "../../activityModel";

export class PredefinedActivityRepository {
  private predefinedActivityDBRepository: PredefinedActivityDBRepository;
  private predefinedRandomActivityRepository: PredefinedRandomActivityRepository;

  constructor(activityModel: PaginateModel<IPredefinedActivity & Document>) {
    this.predefinedActivityDBRepository = new PredefinedActivityDBRepository(
      activityModel
    );
    this.predefinedRandomActivityRepository =
      new PredefinedRandomActivityRepository();
  }

  getPredefinedActivityDBRepository(): PredefinedActivityDBRepository {
    return this.predefinedActivityDBRepository;
  }

  getPredefinedRandomActivityRepository(): PredefinedRandomActivityRepository {
    return this.predefinedRandomActivityRepository;
  }
}

export const GlobalPredefinedActivityRepository =
  new PredefinedActivityRepository(PredefinedActivityModel);

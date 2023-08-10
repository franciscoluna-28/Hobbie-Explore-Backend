    import { UserActionsRepository } from "./userActionsRepository";
    import { UserActivityRepository } from "./userActivityRepository";
    import { UserDescriptionRepository } from "./userDescriptionRepository";
    import { UserStatsRepository } from "./userStatsRepository";
    import { UserTokenRepository } from "./userTokenRepository";
    import { Model } from "mongoose";
    import { IUser } from "../../../types/userTypes";

    export class UserRepository {
    private userActionsRepository: UserActionsRepository;
    private userActivityRepository: UserActivityRepository;
    private userDescriptionRepository: UserDescriptionRepository;
    private userStatsRepository: UserStatsRepository;
    private userTokenRepository: UserTokenRepository;

    constructor(userModel: Model<IUser>) {
        this.userActionsRepository = new UserActionsRepository(userModel);
        this.userActivityRepository = new UserActivityRepository(userModel);
        this.userDescriptionRepository = new UserDescriptionRepository(userModel);
        this.userStatsRepository = new UserStatsRepository(userModel);
        this.userTokenRepository = new UserTokenRepository(userModel);
    }

    getUserActionsRepository(): UserActionsRepository {
        return this.userActionsRepository;
    }

    getUserActivityRepository(): UserActivityRepository {
        return this.userActivityRepository;
    }

    getUserDescriptionRepository(): UserDescriptionRepository {
        return this.userDescriptionRepository;
    }

    getUserStatsRepository(): UserStatsRepository {
        return this.userStatsRepository;
    }

    getUserTokenRepository(): UserTokenRepository {
        return this.userTokenRepository;
    }
    }

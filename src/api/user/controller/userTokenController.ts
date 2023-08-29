import { Model } from "mongoose";
import { IUser } from "../../../types/userTypes";
import { UserTokenRepository } from "../repository/userTokenRepository";
import { Request, Response } from "express"; // Import Express types

export class UserTokenController {
  private userTokenRepository: UserTokenRepository;

  constructor(userModel: Model<IUser>) {
    this.userTokenRepository = new UserTokenRepository(userModel);
  }

  async giveTokenToUser(req: Request, res: Response) {
    const { bearedToken } = req.body;
    const { uid } = req.params;

    console.log("bearedToken is: ", bearedToken, "UID is: ", uid);


    try {
      const result = await this.userTokenRepository.giveTokenToUser(uid, bearedToken);
      
      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }
      
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while updating the token" });
    }
  }
}

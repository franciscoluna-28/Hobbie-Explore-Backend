import { Request, Response } from "express";
import { UserDescriptionRepository } from "../repository/userDescriptionRepository";
import { UserRepository } from "../repository/userRepository";
import UserModel from "../userModel";
import { IUser } from "../../../types/userTypes";
import { GlobalUserRepository } from "../repository/userRepository";

export class UserDescriptionController {
  private userDescriptionRepository: UserDescriptionRepository;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = GlobalUserRepository;
    this.userDescriptionRepository = this.userRepository.getUserDescriptionRepository();
  }

  updateUserDescription = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { newText } = req.body;

    try {
      const updatedUser = await this.userDescriptionRepository.updateUserDescription(uid, newText);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  getUserDescription = async (req: Request, res: Response) => {
    const { uid } = req.params;
    console.log(uid);

    try {
      const description = await this.userDescriptionRepository.getUserDescription(uid);
      return res.status(200).json({ description });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

import { Request, Response } from "express";
import { UserActionsRepository } from "../repository/userActionsRepository";
import { UserRepository } from "../repository/userRepository";
import { GlobalUserRepository } from "../repository/userRepository";

interface CRUDController {
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

export class UserActionsController implements CRUDController {
  private static instance: UserActionsController;
  private userActionsRepository: UserActionsRepository;
  private userRepository: UserRepository;

  private constructor() {
    this.userRepository = GlobalUserRepository;
    this.userActionsRepository = this.userRepository.getUserActionsRepository();
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Singleton pattern to use only one instance of the controller
  static getInstance(): UserActionsController {
    if (!UserActionsController.instance) {
      UserActionsController.instance = new UserActionsController();
    }
    return UserActionsController.instance;
  }

  // Method to create the user
  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        uid,
        bearerToken,
        photoUrl,
        displayName,
        emailVerified,
        disabled,
        createdAt,
      } = req.body;

      const result = await this.userActionsRepository.registerUser(
        email,
        uid,
        bearerToken,
        photoUrl,
        displayName,
        emailVerified,
        disabled,
        createdAt
      ); 
      
      console.log(result);

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      res.status(500).json({ error: "Could not create/update user" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;

      const result = await this.userActionsRepository.deleteUser(uid);

      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

import { Request, Response } from "express";
import { UserRepository } from "./userRepository";
import { HobbieExploreActivityWihtImage } from "../../types/activityTypes";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.registerUser = this.registerUser.bind(this);
    this.deleteActivityFromUser = this.deleteActivityFromUser.bind(this); 
    this.addActivityToUser = this.addActivityToUser.bind(this); 
    this.addTokenToUser = this.addTokenToUser.bind(this)
  }

  registerUser(req: Request, res: Response) {
    const { email, uid, bearedToken } = req.body;



    this.userRepository
      .registerUser(email, uid, bearedToken)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not create a new document!" });
      });
  }

  deleteActivityFromUser(req: Request, res: Response) {
    const { uid } = req.params;
    const activityId = req.query.activityId as string;

    this.userRepository
      .deleteActivityFromUser(uid, activityId)
      .then((result) => {
        if (result.success) {
          res.status(200).json(result);
        } else {
          res.status(404).json(result);
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the activity" });
      });
  }

  addActivityToUser(req: Request, res: Response) {
    try {
      const { uid } = req.params;
      const activityData: HobbieExploreActivityWihtImage = req.body;


      this.userRepository
        .addActivityToUserAndDatabase(uid, activityData)
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(409).json(result);
          }
        })
        .catch((error) => {
          res
            .status(500)
            .json({
              error:
                "An error occurred while adding a new activity to the user",
            });
        });
    } catch (error) {
      console.error("Error adding activity:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while adding a new activity to the user",
        });
    }
  }

  addTokenToUser(req: Request, res: Response) {
    try {
      const { uid } = req.params;
      const { bearedToken } = req.body;

      console.log(bearedToken)

      this.userRepository.giveTokenToUser(uid, bearedToken)
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(409).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ error: "Internal Server Error" });
        });

    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  }
}




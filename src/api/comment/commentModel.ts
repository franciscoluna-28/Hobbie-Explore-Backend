import { Schema, Document, model } from "mongoose";

export interface IUserComment extends Document {
    userUid: string,
    text: string,
    activityId: string,
    userPfp: string,
    userName: string,
    createdAt?: Date;
    isContentModified: boolean;
    userRating: number;
}

const commentSchema = new Schema<IUserComment>({
    userUid: {
        type: String,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    activityId: {
        type: String,
        required: true
    },
    userPfp: {
        type: String,
        default: ""
    }, 
    userName: {
        type: String,
        default: "Anonymous User"
    },
    createdAt: {
        type: Date,
        required: true
    },
    isContentModified: {
        type: Boolean, 
        required: true,
        default: false
    },
    userRating: {
        type: Number,
        ref: "Rating",
        required: true,
        default: 0
    }
});

const CommentModel = model<IUserComment>("Comment", commentSchema);

export default CommentModel;

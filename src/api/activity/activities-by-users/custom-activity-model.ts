import { Schema } from "mongoose"

const CustomActivitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    // I'd love to use our types from TS here
    type: {
        type: String,
        required: true,
    },
    participants: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userUID: {
        type: String,
        required: true,
    },
    userPictureURL: {
        type: String,
        ref: "user",
        required: true,
    },
    accessibility: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    links: {
        type: Array<String>,
        required: true,
    }
})
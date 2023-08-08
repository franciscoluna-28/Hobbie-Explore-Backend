
import { Schema, Document } from "mongoose";
import mongoose from 'mongoose';
import { BoredAPIActivityType } from "../../types/boredAPITypes";
import paginate from 'mongoose-paginate-v2';

// Interfaz de la actividad con imagen
export interface IActivity extends Document{
  activityName: string;
  type: BoredAPIActivityType | string;
  participants: number;
  price: number;
  accessibility: number;
  activityId: string;
  urls: {
    full: string;
    regular: string;
  };
  description: string;
  ratingMean: number;
  totalReviews: number;
  links: Array<Object>;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      medium: string;
    };
  };
}

// Esquema de la actividad con imagen
const ActivitySchema = new Schema<IActivity>({
  activityName: {
    type: String,
    required: true,
  },
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
  accessibility: {
    type: Number,
    required: true,
  },
  activityId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  ratingMean: {
    type: Number,
    required: false,
    default: 0,
  },
  totalReviews: {
    type: Number,
    required: false,
    default: 0,
  },
  links: {
    type: Schema.Types.Mixed,
    required: false,
    default: [],
  },
  urls: {
    full: {
      type: String,
      required: true,
    },
    regular: {
      type: String,
      required: true,
    },
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    links: {
      html: {
        type: String,
        required: true,
      },
    },
    profile_image: {
      medium: {
        type: String,
        required: true,
      },
    },
  },
});

// Aplicar el plugin de paginación al esquema
ActivitySchema.plugin(paginate);

// Declarar una interfaz para el documento de actividad (opcional pero recomendado)
export interface IActivityDocument extends IActivity, Document {}


const ActivityModel = mongoose.model<
  IActivityDocument,
  mongoose.PaginateModel<IActivityDocument>
>('Activity', ActivitySchema);

export default ActivityModel;
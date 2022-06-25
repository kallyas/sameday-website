import mongoose from "mongoose";
import validator from "validator"
import { toJson, paginate } from "./plugins/index.js";

const { Schema } = mongoose;

const generatePatientNumber = () => {
  // output format: SD- + 7 digits incrementally
  // eg: SD-0000001, SD-0000002, SD-0000003, ...
  const prefix = "SD-";
  const number = new Date().getTime();
  return prefix + number.toString().slice(number.toString().length - 7);
};

const patientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    date_of_birth: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    patient_number: {
      type: String,
      required: true,
      trim: true,
      default: generatePatientNumber,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone_number: {
      type: String,
      required: true,
      maxLenght: [10, 'Phone number must be 10 digits'],
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

patientSchema.plugin(toJson);
patientSchema.plugin(paginate);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

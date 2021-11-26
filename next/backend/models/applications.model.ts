import mongoose from "mongoose";

export const ApplicationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  application_source: String,
  email: String,

  institute_id: Number,
  institute_name: String,
  course_id: Number,
  course_name: String,
  fee_waiver_id: Number,
  fee_waiver_name: String,
  level_name: String,

  pre_app_pages: mongoose.Schema.Types.Array,
  pages: mongoose.Schema.Types.Array,

  complete: Boolean
});

export const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

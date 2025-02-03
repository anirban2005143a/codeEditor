import mongoose from "mongoose";
const CodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      require :false
    }
  },
);

export const CodeModel = mongoose.model("Code", CodeSchema);
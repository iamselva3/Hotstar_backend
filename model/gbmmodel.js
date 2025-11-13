// model/gbmModel.js
import mongoose from "mongoose";

const gbmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

const GBM = mongoose.model("GBM", gbmSchema);

export default GBM;

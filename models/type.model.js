const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  typeName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("type", typeSchema);

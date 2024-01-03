const mongoose = require("mongoose");

export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

import mongoose from 'mongoose';

const optToUserSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      otp: {
        type: String,
        required: true,
        trim: true,
      },
    },
    { versionKey: false },
);

const OptToUserModel = mongoose.model('optToUserMap', optToUserSchema);

export default OptToUserModel;

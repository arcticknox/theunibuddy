import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
    {
      members: [{
        type: String,
        required: true,
      }],
      details: {
        type: String,
      },
      maxCount: {
        type: Number,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
);

const RoomModel = mongoose.model('room', roomSchema);

export default RoomModel;

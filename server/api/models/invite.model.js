import mongoose from 'mongoose';

const inviteSchema = mongoose.Schema(
    {
      sUserID: {
        type: String,
        required: true,
      },
      rUserID: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        trim: true,
        enum: ['room', 'project'],
      },
      status: {
        type: String,
        required: true,
        trim: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      join: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
);

const InviteModel = mongoose.model('invites', inviteSchema);

export default InviteModel;

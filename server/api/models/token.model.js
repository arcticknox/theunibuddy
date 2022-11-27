import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
    {
      token: {
        type: String,
        required: true,
        index: true,
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['access', 'refresh', 'email-verify'],
      },
      expires: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
);

const TokenModel = mongoose.model('token', tokenSchema);

export default TokenModel;

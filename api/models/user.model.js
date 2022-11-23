import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        required: true,
        trim: true,
        enum: ['user', 'admin'],
        default: 'user',
      },
      organizationId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Organization',
        required: true,
      },
    },
    {timestamps: true, versionKey: false},
);

userSchema.statics = {
  async isEmailTaken(email) {
    const user = await this.findOne({email});
    return !!user;
  },
};

/* eslint-disable */
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
/* eslint-enable */

const UserModel = mongoose.model('user', userSchema);

export default UserModel;

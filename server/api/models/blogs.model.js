import mongoose from 'mongoose';

const blogsModel = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,
        required: true,
        trim: true,
      },
      userName: {
        type: String,
        required: true,
        ref: 'user',
      },
      userId: {
        type: String,
        ref: 'user',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },

    }, { timestamps: true, versionKey: false },
);

const BlogsModel = mongoose.model('blogs', blogsModel);

export default BlogsModel;

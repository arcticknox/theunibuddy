import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
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

const ProjectModel = mongoose.model('project', projectSchema);

export default ProjectModel;

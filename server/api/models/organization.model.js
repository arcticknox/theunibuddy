import mongoose from 'mongoose';

const organizationModel = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      domains: {
        type: Array,
        required: true,
        lowercase: true,
        trim: true,
      },

    }, { timestamps: true, versionKey: false },
);

const OrganizationModel = mongoose.model('organization', organizationModel);

export default OrganizationModel;

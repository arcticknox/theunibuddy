import httpStatus from 'http-status';
import OrganizationModel from '../models/organization.model.js';
import AppError from '../utils/AppError.js';

const getOrganizations = async () => {
  const organization = await OrganizationModel.find();
  return organization;
};

/**
 * Create organization
 * @param {String} name
 * @param {Array} domains
 * @returns {Object}
 */
const createOrganization = async (body) => {
  const {name, domains} = body;
  const organization = await OrganizationModel.create({name, domains});
  return organization;
};

/**
 *  Update organization
 * @param {String} id
 * @param {Object} updateObject
 * @returns {Object}
 */
const updateOrganization = async (id, updateObject) => {
  const organization = await OrganizationModel.findOneAndUpdate({_id: id}, {$set: updateObject}, {new: true});
  if (!organization) throw new AppError(httpStatus.NOT_FOUND, 'Organization not found.');
  return organization;
};

/**
 * Delete organization
 * @param {String} id
 */
const deleteOrganization = async (id) => {
  await OrganizationModel.remove({_id: id});
};

export default {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};

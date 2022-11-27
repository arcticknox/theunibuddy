import catchAsync from '../utils/catchAsync.js';
import adminService from '../services/admin.service.js';
import responseHandler from '../utils/responseHandler.js';

const get = catchAsync(async (req, res) => {
  const org = await adminService.getOrganizations();
  responseHandler(res, org);
});

const create = catchAsync(async (req, res) => {
  const org = await adminService.createOrganization(req.body);
  responseHandler(res, org);
});

const update = catchAsync(async (req, res) => {
  const { params: { organizationId }, body } = req;
  const org = await adminService.updateOrganization(organizationId, body );
  responseHandler(res, org);
});

const deleteOrg = catchAsync(async (req, res) => {
  const { params: { organizationId } } = req;
  const org = await adminService.deleteOrganization(organizationId);
  responseHandler(res, org);
});

export default {
  get,
  create,
  update,
  deleteOrg,
};

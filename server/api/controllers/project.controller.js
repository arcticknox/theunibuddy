import ProjectGroupService from '../services/project.service.js';
import responseHandler from '../utils/responseHandler.js';
import catchAsync from '../utils/catchAsync.js';


const createProjectGroup = catchAsync(async (req, res) => {
  const { body } = req;
  const projectGroup = await ProjectGroupService.createProjectGroup(body, req.user._id);
  responseHandler(res, { projectGroup });
});


const getProjectGroups = catchAsync(async (req, res) => {
  const status = await ProjectGroupService.getProjectGroups();
  responseHandler(res, { status });
});


const updateProjectGroup = catchAsync(async (req, res) => {
  const { body } = req;
  const projectGroup = await ProjectGroupService.updateProjectGroup(req.params.groupId, body);
  responseHandler(res, { projectGroup });
});


const deleteProjectGroup = catchAsync(async (req, res) => {
  const status = await ProjectGroupService.deleteProjectGroup(req.params.groupId);
  responseHandler(res, { status });
});


const addMember = catchAsync(async (req, res) => {
  const status = await ProjectGroupService.addMember(req.body.members[0], req.user._id);
  responseHandler(res, { status });
});


const removeMember = catchAsync( async (req, res) => {
  const status = await ProjectGroupService.removeMember(req.user._id);
  responseHandler(res, { status });
});

export default {
  createProjectGroup,
  getProjectGroups,
  updateProjectGroup,
  deleteProjectGroup,
  addMember,
  removeMember,
};

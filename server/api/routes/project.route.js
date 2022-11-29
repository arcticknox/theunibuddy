import express from 'express';
import projectController from '../controllers/project.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import projectValidations from '../validations/project.validations.js';

const router = express.Router();
const path = '/project';

router.route('/')
    .post(
        requestValidatorMiddleware(projectValidations.createProjectGroup),
        projectController.createProjectGroup,
    )
    .get(
        projectController.getProjectGroups,
    );

router.put(
    '/addMember',
    requestValidatorMiddleware(projectValidations.addMember),
    projectController.addMember,
);

router.put(
    '/:groupId',
    requestValidatorMiddleware(projectValidations.updateProjectGroup),
    projectController.updateProjectGroup,
);

router.route('/removeMember').delete(
    projectController.removeMember,
);

router.route('/:groupId').delete(
    requestValidatorMiddleware(projectValidations.deleteProjectGroup),
    projectController.deleteProjectGroup,
);


export {
  router,
  path,
};

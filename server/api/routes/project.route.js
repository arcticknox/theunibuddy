import express from 'express';
import projectController from '../controllers/project.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import projectValidations from '../validations/project.validations.js';

const router = express.Router();

router.route('/')
    .post(
        requestValidatorMiddleware(projectValidations.createProjectGroup),
        authMiddleware(),
        projectController.createProjectGroup,
    )
    .get(
        authMiddleware(),
        projectController.getProjectGroups,
    );

router.put(
    '/addMember',
    authMiddleware(),
    requestValidatorMiddleware(projectValidations.addMember),
    projectController.addMember,
);

router.put(
    '/:groupId',
    requestValidatorMiddleware(projectValidations.updateProjectGroup),
    authMiddleware(),
    projectController.updateProjectGroup,
);

router.route('/removeMember').delete(
    authMiddleware(),
    projectController.removeMember,
);

router.route('/:groupId').delete(
    requestValidatorMiddleware(projectValidations.deleteProjectGroup),
    authMiddleware(),
    projectController.deleteProjectGroup,
);


export default router;

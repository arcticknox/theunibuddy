import express from 'express';
import inviteController from '../controllers/invite.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import inviteValidations from '../validations/invite.validations.js';

const router = express.Router();
const path = '/invite';

// get invite
router.get(
    '/sent',
    requestValidatorMiddleware(inviteValidations.getAllSentInvites),
    inviteController.getAllSentInvites,
);

// get invite
router.get(
    '/recieved',
    requestValidatorMiddleware(inviteValidations.getAllRecievedInvites),
    inviteController.getAllRecievedInvites,
);

// send invite
router.post(
    '/send',
    requestValidatorMiddleware(inviteValidations.sendInvite),
    inviteController.sendInvite,

);

// accept invite
router.put(
    '/accept/:inviteId',
    requestValidatorMiddleware(inviteValidations.acceptInvite),
    inviteController.acceptInvite,
);

// reject invite
router.put(
    '/reject/:inviteId',
    requestValidatorMiddleware(inviteValidations.rejectInvite),
    inviteController.rejectInvite,
);

// cancel invite
router.delete(
    '/:inviteId',
    requestValidatorMiddleware(inviteValidations.deleteInvite),
    inviteController.deleteInvite,
);

export {
  router,
  path,
};

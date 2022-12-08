import express from 'express';
import roomController from '../controllers/room.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import roomValidations from '../validations/room.validations.js';

const router = express.Router();
const path = '/room';

router.route('/')
    .post(
        requestValidatorMiddleware(roomValidations.createRoom),
        roomController.createRoom,
    )
    .get(
        roomController.getRooms,
    );

router.put(
    '/addMember',
    requestValidatorMiddleware(roomValidations.addMember),
    roomController.addMember,
);

router.put(
    '/',
    requestValidatorMiddleware(roomValidations.updateRoom),
    roomController.updateRoom,
);

router.route('/removeMember').delete(
    roomController.removeMember,
);

router.route('/:roomId').delete(
    roomController.deleteRoom,
);

router.route('/listings').get(
    roomController.getListings,
);

router.route('/userRoom').get(
    roomController.getUserRoom,
);
router.route('/userRoomId/:Id').get(
    roomController.getUserRoomId,
);
router.route('/kickMember/:Id').delete(
    roomController.kickMember,
);

export {
  router,
  path,
};

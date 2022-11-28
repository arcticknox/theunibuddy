import express from 'express';
import roomController from '../controllers/room.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roomValidations from '../validations/room.validations.js';

const router = express.Router();

router.route('/')
    .post(
        requestValidatorMiddleware(roomValidations.createRoom),
        authMiddleware(),
        roomController.createRoom,
    )
    .get(
        authMiddleware(),
        roomController.getRooms,
    );

router.put(
    '/addMember',
    authMiddleware(),
    requestValidatorMiddleware(roomValidations.addMember),
    roomController.addMember,
);

router.put(
    '/:roomId',
    requestValidatorMiddleware(roomValidations.updateRoom),
    authMiddleware(),
    roomController.updateRoom,
);

router.route('/removeMember').delete(
    authMiddleware(),
    roomController.removeMember,
);

router.route('/:roomId').delete(
    authMiddleware(),
    roomController.deleteRoom,
);


export default router;

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    createFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

const router = require('express').Router();

router
  .route('/')
  .get(getAllUser)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:id/friends/:friendId')
  .post(createFriend)
  .put(addFriend)
  .delete(deleteFriend);

module.exports = router;
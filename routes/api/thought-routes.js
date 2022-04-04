const router = require('express').Router();
const {
  getThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getThought)

router
.route('/:userId')
.post(addThought);

router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)

router
  .route('/:userId/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:userId/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
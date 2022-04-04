const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
    User.find({})
        .populate({
        path: 'thoughts',
        select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },
    
    getUserById({ params }, res) {
    User.findOne({ _id: params.id })
        .populate('friends')
        .populate('thoughts')
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    createUser({ body }, res) {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
    User.findOneAndUpdate(
            { _id: params.id },
            { $push: {friends: {_id: params.friendId} } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    createFriend({params}, res) {
        User.create(
                { _id: params.id },
                {friends: {_id: params.friendId} },
                { new: true, runValidators: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
        },

    deleteFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.friendId })
        .then(deleteFriend => {
            if (!deleteFriend) {
                return res.status(404).json({ message: 'No friend with this id!' });
              }
              return User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId } },
                { new: true }
              );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;
const Comment = require('../databases/Comment');

module.exports = {
    create: async (comment={}) => {
        return Comment.create(comment)
    }
}

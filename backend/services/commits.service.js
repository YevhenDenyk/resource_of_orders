const Commit = require('../databases/Commit');

module.exports = {
    create: async (commit) => {
        return Commit.create(commit)
    }
}

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    bycrpt: password => {
        return bcrypt.hash(password, saltRounds)
    },
    compare: (password, hash) => {
        return bcrypt.compare(password, hash)
    }
};

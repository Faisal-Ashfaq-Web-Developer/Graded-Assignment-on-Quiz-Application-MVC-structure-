class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

class Quiz {
    constructor(id, question, options, correctOption) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.correctOption = correctOption;
    }
}

module.exports = {
    User,
    Quiz
};

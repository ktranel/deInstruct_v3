class ErrorHandler extends Error{
    constructor(message='', type, ...args) {
        super(message, ...args);
        this.type = type;
        this.message = message;
    }
}

module.exports = { ErrorHandler };
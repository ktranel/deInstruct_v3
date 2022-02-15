const { Logger } = require('../utilities/logger');
const { VALIDATION, ERROR } = require('../definitions/errors');

module.exports = (fn) => (req, res, next) => {
    const logger = new Logger();
    Promise.resolve(fn(req, res, next))
        .then(result => {
            if (req.password) delete req.password;
            if (req.body.password) delete req.body.password;
            if (req.params.password) delete req.params.password;
            if (result && result.password) delete result.password;
            // log that everything happened ok
            logger.info(result, {
                url: req.originalUrl,
                body: req.body,
                query: req.query,
                params: req.params,
                user: req.user ? req.user.id : req.user,
                description: 'Status 200 Successful'
            });
            // send back the actual response
            return res.status(200).json({ result });
        })
        .catch(error => {
            if (req.password) delete req.password;
            if (req.body.password) delete req.body.password;
            if (req.params.password) delete req.params.password;
            if (error.type === VALIDATION) {
                logger.warn(error, {
                    url: req.originalUrl,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    user: req.user ? req.user.id : req.user,
                    description: 'Status 400 Validation Error'
                });
                return res.status(400).json({ error: error.message });
            }
            if (error.type === ERROR) {
                if (req.password) delete req.password;
                if (req.body.password) delete req.body.password;
                if (req.params.password) delete req.params.password;
                logger.error(error, {
                    url: req.originalUrl,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    user: req.user ? req.user.id : req.user,
                    description: 'Status 500 Unable to handle request'
                });
                return res.status(500).json({ error: 'Unable to handle request' });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        });
}
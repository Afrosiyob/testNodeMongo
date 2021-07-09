const helmet = require("helmet");
const compression = require("compression");

const prodUseApp = (app) => {
    app.use(helmet());
    app.use(compression());
};

module.exports = {
    prodUseApp,
};
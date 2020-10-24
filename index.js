const express = require('express'),
    bodyParser = require('body-parser'),
    APIRoutes = require('./src/routes/index'),
    mongo = require('./src/db/mongo');
    app = express();

app.use(bodyParser.json({
    limit: '100mb'
}));


new APIRoutes(app);

app.listen(9000, '0.0.0.0', () => {
    console.log(`Node server up and running on port 9000`);
});
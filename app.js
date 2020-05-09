require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

require('./configs/passport.config');
require('./configs/db.config');

// Middleware Setup
const whitelist = [
	'http://localhost:3000',
];
const corsOptions = {
	origin(origin, callback) {
		const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true,
};


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)); 


app.use(express.static(path.join(__dirname, 'public')));


// default value for title local
app.locals.title = 'OnEat';

app.use(require('./routes'));


app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
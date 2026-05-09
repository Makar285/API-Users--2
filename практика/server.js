// Express Import
const express = require('express');
const app = express();


// For Use Handlebars
const expressHbs = require('express-handlebars');
const myEngine = expressHbs.engine;
app.engine('hbs', myEngine({defaultLayout: 'main-layout', layoutsDir: 'views/layouts', extname: 'hbs', helpers: {lengthNameMore(name, number) {return name.length > number}}}));
app.set('view engine', 'hbs');
app.set('views', 'views');


// Other Import
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');


// Import My File
const users = require('./routes/users');
const usersPreviously = require('./routes/usersPreviously');
const start = require('./routes/start');


// For Use Folder public In Browser
app.use(express.static(path.join(__dirname, 'public')));


// Path Users Data
const pathUsersFile = path.join(__dirname, 'users.json');


// Create File users.json, If There Is None
if (!fs.existsSync(pathUsersFile)) {
  fs.writeFileSync(pathUsersFile, JSON.stringify([]));
};


// Routing
app.use('/users', users);
app.use('/users/previously', usersPreviously);
app.use(start);


// Page Not Found
app.use('/', (req, res, next) => {
  helpers.notFound(res);
});


// Running The Server On Port 2000
app.listen(2000);

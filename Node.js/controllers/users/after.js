// Import
const fs = require('fs');


// Functions
const helpers = require('../../helpers');


// Variables
const config = require('../../config');


// Update
module.exports.update = (req, res, next) => {
  const regex = /\/update\/id=(\d+)&name=([^&]+)&age=(\d+)&isDelete=((true|false))/;
  const match = req.originalUrl.split("/users")[1].match(regex);

  const id = match[1];
  const name = decodeURIComponent(match[2].replaceAll("+", " "));
  const age = match[3];
  const isDelete = (match[4] === 'true')? (true): (false);

  fs.readFile(config.pathUsersFile, (err, data) => {
    if (!err) {
      const newData = JSON.parse(data.toString());
      let currentUser;
      for (const user of newData) {
        if (user.id === +id) {
          user.name = name;
          user.age = +age;
          user.isDelete = isDelete;
          currentUser = user;
        };
      };

      if(!currentUser) {
        helpers.notFound(res);
        return;
      };

      fs.writeFile(config.pathUsersFile, JSON.stringify(newData), (err) => {
        if (!err) {
          res.render('after/update', { title: "Update User", user: currentUser, hasCSS: true });
        };
      });
    };
  });
};

// Add
module.exports.add = (req, res, next) => {
  const regex = /\/addUser\/name=([^&]+)&age=(\d+)&isDelete=(true|false)/;
  const match = req.originalUrl.split('/users')[1].match(regex);

  const name = decodeURIComponent(match[1].replaceAll('+', ' '));
  const age = match[2];
  const isDelete = (match[3] === 'true')? (true): (false);

  fs.readFile(config.pathUsersFile, (err, data) => {
    if(!err) {
      const users = JSON.parse(data);
      
      let idNewUser = 0;
      for (const user of users) {
        if(user.id > idNewUser) {
          idNewUser = user.id;
        };
      };

      const idUserInArray = users.length;

      const newUser = {
        id: idNewUser+1,
        name,
        age: +age,
        isDelete
      };

      users[idUserInArray] = newUser;

      fs.writeFile(config.pathUsersFile, JSON.stringify(users), (err) => {
        if(!err) {
          res.render('after/addUser', { title: "Add User", user: newUser, hasCSS: true })
        };
      });
    };
  });
};

// Delete
module.exports.delete = (req, res, next) => {
  const id = req.url.match(/\/delete\/id=(\d+)/)[1];

  fs.readFile(config.pathUsersFile, (err, data) => {
    if(!err) {
      const newData = JSON.parse(data.toString());

      let currentUser;
      for (const user of newData) {
        if(user.id === +id) {
          currentUser = user
        };
      };

      if(!currentUser) {
        helpers.notFound(res)
        return;
      };

      const indexUserInArray = newData.indexOf(currentUser);
      
      currentUser.isDelete = true;

      newData[indexUserInArray] = currentUser;

      fs.writeFile(config.pathUsersFile, JSON.stringify(newData), (err) => {
        if(!err) {
          res.render('after/delete', { title: "Delete User", user: currentUser, hasCSS: true })
        };
      });
    };
  });
};

// Get User By Id
module.exports.getUserById = (req, res, next) => {
  const stringQueryOneParametr = req.url.split("=");

  const id = stringQueryOneParametr[1];

  fs.readFile(config.pathUsersFile, (err, data) => {
    if (!err) {
      const dataJson = JSON.parse(data);

      let user;
      for (const obj of dataJson) {
        if (obj.id == id) {
          user = obj;
        };
      };

      if(!user) {
        helpers.notFound(res);
        return;
      };

      res.render('after/getUserById', {title: "Get User By Id", user: user, hasCSS: true })
    };
  });
};

// Get All Users
module.exports.getAllUsers = (req, res, next) => {
  const data = fs.readFile(config.pathUsersFile, (err, data) => {
    if(!err) {
      const currentData = JSON.parse(data.toString());
      res.render('after/getAllUsers', {title: "Get All Users", users: currentData, hasCSS: true, lengthUsersArrayPositive: currentData.length > 0, activeUsers: true })
    };
  });
};

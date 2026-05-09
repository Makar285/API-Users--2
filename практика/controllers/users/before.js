module.exports.update = (req, res, next) => {
  res.render('before/update', {title: "Update User", hasCSS: true, activeUpdate: true});
};

module.exports.add = (req, res, next) => {
  res.render('before/addUser', {title: "Add User", hasCSS: true,  activeAdd: true});
};

module.exports.delete = (req, res, next) => {
  res.render('before/delete', {title: "Add User", hasCSS: true, activeDelete: true});
};

module.exports.getUserById = (req, res, next) => {
  res.render('before/getUserById', {title: "Get User Bt Id", hasCSS: true, activeId: true});
};
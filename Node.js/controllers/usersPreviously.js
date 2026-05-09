function getData(req) {
  const {id, name: notName, age, isDelete} = req.body;
  const name = decodeURIComponent(notName).replace(' ', '+');
  return {id, name, age, isDelete}
};


exports.update = (req, res, next) => {
  const {id, name, age, isDelete} = getData(req);

  res.redirect(`/users/update/id=${id}&name=${name}&age=${age}&isDelete=${isDelete}`);
};

exports.add = (req, res, next) => {
  const {name, age, isDelete} = getData(req);

  res.redirect(`/users/addUser/name=${name}&age=${age}&isDelete=${isDelete}`);
};

exports.delete = (req, res, next) => {
  const {id} = req.body;

  res.redirect(`/users/delete/id=${id}`);
};

exports.getUserById = (req, res, next) => {
  const {id} = req.body;

  res.redirect(`/users/id=${id}`);
};
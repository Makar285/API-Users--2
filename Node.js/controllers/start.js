module.exports.startPage = (req, res, next) => {
  res.render('start', {title: "Start Page", activeMainPage: true});
};
module.exports.notFound = function notFound(res) {
  res.render('404', {title: "Page Not Found", hasCSS: true});
};
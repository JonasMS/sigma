module.exports = (app, express) => {
  app.use(express.static(__dirname + '../'));
  app.use(express.static(__dirname + '../build'));
  console.log('server statics');
}

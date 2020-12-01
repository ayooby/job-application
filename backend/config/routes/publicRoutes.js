const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'GET /company/:uuid/': 'CompanyController.get',
  'GET /job/:uuid/': 'JobController.get',
};

module.exports = publicRoutes;

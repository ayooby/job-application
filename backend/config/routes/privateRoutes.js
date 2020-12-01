const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /company': 'CompanyController.getUserCompanies',
  'GET /company/all': 'CompanyController.getAll',
  'POST /company': 'CompanyController.create',
  'PUT /company/:uuid/': 'CompanyController.update',
  'DELETE /company/:uuid/': 'CompanyController.destroy',
  'GET /job': 'JobController.getAll',
  'POST /job': 'JobController.create',
  'PUT /job/:uuid/': 'JobController.update',
  'DELETE /job/:uuid/': 'JobController.destroy',
};

module.exports = privateRoutes;

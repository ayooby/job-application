const Company = require("../models/Company");

const CompanyController = () => {
  const get = async (req, res) => {
    const { uuid } = req.params;

    try {
      const company = await Company.findByPk(uuid);

      if (!company) {
        return res.status(400).json({ msg: "Can not find company" });
      }

      return res.status(200).json({ company });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const create = async (req, res) => {
    // body is part of a form-data
    const { name, is_enabled } = req.body;
    try {
      const company = await Company.create({
        name,
        is_enabled,
        user_id: req.user.id,
      });

      if (!company) {
        return res.status(400).json({ msg: "Bad Request: Model not found" });
      }

      return res.status(200).json({ company });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getAll = async (req, res) => {
    try {
      const list = await Company.findAll();

      if (!list) {
        return res.status(400).json({ msg: "Bad Request: Models not found" });
      }

      return res.status(200).json({ list });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getUserCompanies = async (req, res) => {
    try {
      const list = await Company.findAll({
        where: {
          user_id: req.user.id,
        },
      });

      if (!list) {
        return res.status(400).json({ msg: "Bad Request: Models not found" });
      }

      return res.status(200).json({ list });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const update = async (req, res) => {
    const { uuid } = req.params;

    try {
      const company = await Company.findByPk(uuid);

      if (!company) {
        return res.status(400).json({ msg: "Bad Request: Model not found" });
      }

      const updatedModel = company.update({
        title: req.body.value,
      });

      return res.status(200).json({ updatedModel });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const destroy = async (req, res) => {
    // params is part of an url
    const { uuid } = req.params;

    try {
      const company = Model.findById(uuid);

      if (!company) {
        return res.status(400).json({ msg: "Bad Request: Model not found" });
      }

      await company.destroy();

      return res.status(200).json({ msg: "Successfully destroyed model" });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    get,
    getAll,
    create,
    update,
    destroy,
    getUserCompanies,
  };
};

module.exports = CompanyController;

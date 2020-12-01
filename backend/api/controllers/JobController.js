const Company = require("../models/Company");
const Job = require("../models/Job");

const JobController = () => {
  const get = async (req, res) => {
    const { uuid } = req.params;

    try {
      const job = await Job.findByPk(uuid);

      if (!job) {
        return res.status(400).json({ msg: "Can not find job" });
      }

      return res.status(200).json({ job });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const create = async (req, res) => {
    const { title, company_id } = req.body;
    try {
      const job = await Job.create({
        title,
        company_id,
        user_id: req.user.id,
      });

      if (!job) {
        return res.status(400).json({ msg: "Bad Request: Job not found" });
      }

      return res.status(200).json({ job });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getAll = async (req, res) => {
    try {
      const list = await Job.findAll({
        where: {
          user_id: req.user.id,
        },
      });

      if (!list) {
        return res.status(400).json({ msg: "Bad Request: Job not found" });
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
      let job = await Job.findByPk(uuid);

      if (!job) {
        return res.status(400).json({ msg: "Bad Request: Job not found" });
      }

      job = company.update({
        title: req.body.value,
      });

      return res.status(200).json({ job });
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
      const job = Job.findById(uuid);

      if (!job) {
        return res.status(400).json({ msg: "Bad Request: Model not found" });
      }

      await job.destroy();

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
  };
};

module.exports = JobController;

const { Deferrable, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const Company = require("./Company");
const User = require("./User");

const tableName = "jobs";

const Job = sequelize.define(
  "Job",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    allow_contact_by_app: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_user_bring_boat: { type: DataTypes.BOOLEAN, defaultValue: false },
    allow_picking_from_spot: { type: DataTypes.BOOLEAN, defaultValue: false },
    allow_repair_on_spot: { type: DataTypes.BOOLEAN, defaultValue: false },
    allow_contact_by_phone: { type: DataTypes.BOOLEAN, defaultValue: false },
    allow_contact_by_email: { type: DataTypes.BOOLEAN, defaultValue: false },
    posted: { type: DataTypes.BOOLEAN, defaultValue: false },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_emergency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    due_datetime: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    is_done: { type: DataTypes.BOOLEAN, defaultValue: false },
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Company,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  { tableName }
);

// eslint-disable-next-line
Job.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Job;

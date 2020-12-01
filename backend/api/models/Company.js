const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "companies";

const Company = sequelize.define(
  "Company",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    logo_image_url: { type: DataTypes.STRING },
    cvr: { type: DataTypes.STRING(10) },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    user_id: {
      type: DataTypes.INTEGER,

      references: {
        model: User,
        key: "id",

        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      },
    },
  },
  { tableName }
);

// eslint-disable-next-line
Company.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Company;

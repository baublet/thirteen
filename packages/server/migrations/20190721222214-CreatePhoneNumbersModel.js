module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("phone_numbers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true
      },
      verification_code_id: {
        type: Sequelize.STRING,
        unique: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("phone_numbers");
  }
};

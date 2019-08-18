

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('registrations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    event_id: {
      references: { model: 'events', key: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: queryInterface => queryInterface.dropTable('registrations'),
};

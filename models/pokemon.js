import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.config.js'

const Pokemon = db.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pokemonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customeName: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idInPage: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

export default Pokemon
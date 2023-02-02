import dotenv from 'dotenv';

dotenv.config();

export default 
  {
  "development": {
    "username": process.env['db_username'],
    "password": process.env['db_password'],
    "database": process.env['db_database'],
    "host": process.env['db_host'],
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "dialect": "mysql"
  }
}

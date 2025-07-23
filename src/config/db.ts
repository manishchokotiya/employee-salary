import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME ||"",
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'new_password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

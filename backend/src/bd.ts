import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entidades/*.ts"],

});

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados iniciado!');
  })
  .catch((error) => {
    console.error('Erro ao iniciar o banco de dados:', error);
  });


import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "connect-event-db",
    entities: ["src/entidades/*.ts"],

});

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados iniciado!');
  })
  .catch((error) => {
    console.error('Erro ao iniciar o banco de dados:', error);
  });


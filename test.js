const mariadb = require('mariadb');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = await mariadb.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// Realizar una operación simple de prueba
try {
  const rows = await connection.query('SELECT 1 as val');
  console.log('Connected to MariaDB. Result:', rows);
} catch (error) {
  console.error('Error connecting to MariaDB:', error);
} finally {
  await connection.end();
}
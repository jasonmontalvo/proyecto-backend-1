const mariadb = require("mariadb");
const pool = async () => {
  try {
    const pool = mariadb.createPool({
      host: "localhost",
      user: "root",
      database: "clietes",
      port: "3306",
      password:"olakase12"
    });
    let conn = await pool.getConnection();
    global.conn = conn;
    console.log("mariadb db connected")
  } catch (error) {
    throw error;
  }
};
module.exports = pool;
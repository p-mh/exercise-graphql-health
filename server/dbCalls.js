const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'health',
  password: 'password',
  port: 5432,
});

const fetchUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

const fetchUserById = async userId => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);
  return rows[0];
};

const fetchHealthDataByUserId = async user_id => {
  const { rows } = await pool.query(
    `SELECT * FROM health_data WHERE user_id = ${user_id} ORDER BY date`
  );
  return rows;
};

const fetchAverageHealthDataGroupByDate = async () => {
  const { rows } = await pool.query(
    'SELECT date, ROUND(AVG(weight),1) AS weight,ROUND(AVG(alcohol),1) AS alcohol,ROUND(AVG(calories),1) AS calories,ROUND(AVG(steps),1) AS steps FROM health_data GROUP BY date ORDER BY date'
  );
  return rows;
};

module.exports = {
  fetchUsers,
  fetchUserById,
  fetchHealthDataByUserId,
  fetchAverageHealthDataGroupByDate,
};

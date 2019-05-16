const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'health',
  password: 'password',
  port: 5432,
});

const tables = [
  'CREATE TABLE users (id BIGSERIAL, name TEXT)',
  'CREATE TABLE health_data (user_id BIGINT, date DATE, weight INT, alcohol INT, calories INT, steps INT)',
];

const users = ['Toto', 'Tutu'];

const healthData = [
  {
    user_id: 1,
    date: '2019-05-04',
    weight: 70,
    alcohol: 3,
    calories: 2300,
    steps: 8540,
  },
  {
    user_id: 1,
    date: '2019-05-03',
    weight: 70,
    alcohol: 0,
    calories: 2150,
    steps: 7130,
  },
  {
    user_id: 1,
    date: '2019-05-02',
    weight: 72,
    alcohol: 0,
    calories: 2400,
    steps: 1840,
  },
  {
    user_id: 2,
    date: '2019-05-04',
    weight: 83,
    alcohol: 4,
    calories: 2000,
    steps: 1234,
  },
  {
    user_id: 2,
    date: '2019-05-03',
    weight: 81,
    alcohol: 6,
    calories: 1800,
    steps: 9473,
  },
];

const deleteAll = async () => {
  try {
    await pool.query('DROP TABLE users, health_data');
  } catch (e) {
    console.log('delete error:', e);
  }
};

const createTables = async () => {
  try {
    await Promise.all(tables.map(table => pool.query(table)));
  } catch (e) {
    console.log('createTable error:', e);
  }
};

const createUsers = async () => {
  try {
    await Promise.all(
      users.map(userName =>
        pool.query(`INSERT INTO users (name) VALUES ('${userName}')`)
      )
    );
  } catch (e) {
    console.log('createUsers error:', e);
  }
};

const createHealthData = async () => {
  try {
    await Promise.all(
      healthData.map(({ user_id, date, weight, alcohol, calories, steps }) =>
        pool.query(
          `INSERT INTO health_data (user_id, date, weight, alcohol, calories, steps) VALUES (${user_id},'${date}',${weight},${alcohol},${calories},${steps})`
        )
      )
    );
  } catch (e) {
    console.log('createData error:', e);
  }
};

const initDb = async () => {
  await deleteAll();
  await createTables();
  await createUsers();
  await createHealthData();
};

initDb();

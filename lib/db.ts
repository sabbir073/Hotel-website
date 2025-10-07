import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,
  // SSL configuration for cPanel remote MySQL
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false } // Use false for self-signed certificates
    : undefined,
});

export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, values);
  return rows as T;
}

export default pool;

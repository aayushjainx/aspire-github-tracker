import { Pool, PoolConfig } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL is not set');
}

const poolConfig: PoolConfig = {
	connectionString: databaseUrl,
	ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
};

export const db = new Pool(poolConfig);

export async function withTransaction<T>(fn: (client: import('pg').PoolClient) => Promise<T>): Promise<T> {
	const client = await db.connect();
	try {
		await client.query('BEGIN');
		const result = await fn(client);
		await client.query('COMMIT');
		return result;
	} catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
}

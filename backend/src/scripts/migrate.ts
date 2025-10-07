import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { db } from '../db/client';

async function run() {
	const migrationsDir = path.resolve(__dirname, '../../migrations');
	const files = fs.readdirSync(migrationsDir)
		.filter((f) => f.endsWith('.sql'))
		.sort();
	for (const file of files) {
		const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
		console.log(`Applying migration: ${file}`);
		await db.query(sql);
	}
	console.log('Migrations applied.');
	await db.end();
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});

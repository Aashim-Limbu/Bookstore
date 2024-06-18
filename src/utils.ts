import { Client } from "pg";
export async function getClient() {
	const config = {
		user: "postgres",
		password: "postgres",
		host: "localhost",
		port: 5432,
		database: "test",
	};

	const client = new Client(config);
	await client.connect();
	console.log("connected successfully");
	return client;
}

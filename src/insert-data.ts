import { getClient } from "./utils";

async function createEntries() {
	const client = await getClient();
	const userQuery = `Insert into users (email,password) values ($1,$2) returning id`;
	const userData = ["aashish@gmail.com", "aashim123"];
	const response = await client.query(userQuery, userData);
    console.log(response)
	const todoQuery = `Insert into todos (title,description,user_id,done) values ($1,$2,$3,$4) returning id`;
	const todoData = ["firstTask", "for Saturday", response.rows[0].id,false];
	await client.query(todoQuery, todoData);
	console.log("Entries created!");
    await client.end()
}

createEntries();

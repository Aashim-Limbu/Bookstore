import { getClient } from "./utils";

async function getUsers() {
	const client = await getClient();
	const getUsersQuery = `SELECT * from Users`;
	const UserRes = (await client).query(getUsersQuery);
	console.log("Users:  ");
	for (let user of (await UserRes).rows) {
		console.log(`id: ${user.id} & email: ${user.email}`);
	}
	await client.end();
}

async function getUserFromEmail(email: string) {
	const client = await getClient();
	const getEmailUser = `Select * from Users where email = $1`;
	const UserRes = await client.query(getEmailUser, [email]);
	if (!UserRes.rows.length) {
		console.log("Sorry but the user not found");
		await client.end();
		return;
	}
	console.log("Found the user");
	console.log(`id: ${UserRes.rows[0].id} , email: ${UserRes.rows[0].email}`);
	await client.end();
}

async function getTodosForUser(userId: number) {
	const client = await getClient();

	const selectTodosText = "SELECT * FROM todos WHERE user_id = $1";
	const todoRes = await client.query(selectTodosText, [userId]);
	if (todoRes.rows.length === 0) {
		console.log("Sorry no User Found ");
		await client.end();
		return;
	}
	console.log(`Todos for User ID ${userId}:`);
	for (let todo of todoRes.rows) {
		console.log(
			`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`
		);
	}
	await client.end();
}

// getUsers();

getUserFromEmail("aashim1@gmail.com");

// const userIdToFetch = 5;
// getTodosForUser(userIdToFetch);

import { getClient } from "./utils";

async function updateTodo(todoId: number) {
    const client = await getClient();

    const updateTodoText = 'UPDATE todos SET done = $1 WHERE id = $2';
    await client.query(updateTodoText, [true, todoId]);

    console.log(`Todo with ID ${todoId} updated to done!`);
    await client.end()
}

const todoIdToUpdate = 2;
updateTodo(todoIdToUpdate);

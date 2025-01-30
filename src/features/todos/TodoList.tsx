import './todo.css';
import { useState } from 'react';
import { addTodo, deleteTodo, getTodos, updateTodo } from '@/api/todosApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TodoList = () => {
	const [newTodo, setNewTodo] = useState('');
	const queryClient = useQueryClient();

	const { isLoading, isError, error, data: todos } = useQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
		select: (data) => data.sort((a, b) => a.id - b.id),
	});

	const addTodoMutation = useMutation({
		mutationFn: addTodo,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	const updateTodoMutation = useMutation({
		mutationFn: updateTodo,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	const deleteTodoMutation = useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newTodo.trim()) return; 
		addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
		setNewTodo('');
	};

	const newItemSection = (
		<form onSubmit={handleSubmit}>
			<label htmlFor="new-todo">Enter a new todo item</label>
			<div className="new-todo">
				<input
					type="text"
					id="new-todo"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Enter new todo"
				/>
			</div>
			<button className="submit">Add</button>
		</form>
	);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isError) {
		content = <p>Error: {error.message}</p>;
	} else {
		content = todos.map((todo) => (
			<article key={todo.id}>
				<div className="todo">
					<input
						type="checkbox"
						checked={todo.completed}
						id={`todo-${todo.id}`}
						onChange={() =>
							updateTodoMutation.mutate({
								...todo,
								completed: !todo.completed,
							})
						}
					/>
					<label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
				</div>
				<button
					className="trash"
					onClick={() => deleteTodoMutation.mutate(todo.id)}
				>
					Delete
				</button>
			</article>
		));
	}

	return (
		<main>
			<h1>Todo List</h1>
			{newItemSection}
			{content}
		</main>
	);
};

export default TodoList;

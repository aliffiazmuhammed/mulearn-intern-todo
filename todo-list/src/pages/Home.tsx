import { useEffect, useState } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem('loggedInUser');
    useEffect(() => {
        if (!username) {
            navigate('/signin');
        }
    }, []);

    const [todos, setTodos] = useState<Todo[]>(() => {
        const localValue = localStorage.getItem(username || '');
        if (localValue == null) return [];
        return JSON.parse(localValue);
    });

    useEffect(() => {
        localStorage.setItem(username || '', JSON.stringify(todos));
    }, [todos, username]);

    function addTodo(title: string) {
        setTodos(currentTodos => [
            ...currentTodos,
            { id: crypto.randomUUID(), title, completed: false },
        ]);
    }

    function toggleTodo(id: string, completed: boolean) {
        setTodos(currentTodos => currentTodos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed };
            }
            return todo;
        }));
    }

    function deleteTodo(id: string) {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
    );
}

export default Home;

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
            navigate('/mulearn-intern-todo/signin');
        }
    }, [navigate, username]);

    const [todos, setTodos] = useState<Todo[]>(() => {
        const localValue = localStorage.getItem("ITEMS");
        if (localValue === null) return [];
        return JSON.parse(localValue);
    });

    useEffect(() => {
        if (username) {
            localStorage.setItem("ITEMS", JSON.stringify(todos));
        }
    }, [todos, username]);

    function addTodo(title: string) {
        const newTodo: Todo = { id: crypto.randomUUID(), title, completed: false };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

    function toggleTodo(id: string, completed: boolean) {
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
        );
    }

    function deleteTodo(id: string) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
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


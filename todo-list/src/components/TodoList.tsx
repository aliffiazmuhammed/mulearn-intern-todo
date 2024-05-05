
import { TodoItem } from './TodoItem';
import '../App.css';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
    return (
        <ul className="list">
            {todos.length === 0 && <li>No Todos</li>}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}

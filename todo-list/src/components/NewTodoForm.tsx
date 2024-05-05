import  { useState, ChangeEvent, FormEvent } from "react";

interface NewTodoFormProps {
    onSubmit: (title: string) => void;
}

export function NewTodoForm({ onSubmit }: NewTodoFormProps) {
    const [newItem, setNewItem] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newItem === "") return;

        onSubmit(newItem);
        setNewItem("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={handleChange}
                    type="text"
                    id="item"
                />
            </div>
            <button type="submit" className="btn">Add</button>
        </form>
    );
}

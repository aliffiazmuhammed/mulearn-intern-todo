import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState<FormValues>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (values.username && values.password && values.email) {
            if (!localStorage.getItem(values.username)) {
                localStorage.setItem(values.username, JSON.stringify(values));
                navigate('/signin');
            } else {
                alert('User already registered');
            }
        } else {
            alert('Incomplete');
        }
    };

    return (
        <div className='container'>
            <form className="new-item-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button className="btn" type="submit">Sign up</button>
                <span>Already have an account?<Link to="/signin"> SIGN IN</Link></span>
            </form>
        </div>
    );
}

export default Signup;


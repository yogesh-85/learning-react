import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../helpers/Wrapper';
import classes from './AddUser.module.css';


const AddUser = (props) => {
    const nameInputRef = useRef()
    const ageInputRef = useRef()
    const collegeInputRef = useRef()

    const [error, setError] = useState()


    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const enteredcollege = collegeInputRef.current.value;

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredcollege.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).',
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).',
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge, enteredcollege);
        nameInputRef.current.value = ''
        ageInputRef.current.value = ''
        collegeInputRef.current.value = ''
    };



    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        ref={nameInputRef}
                    />
                    <label htmlFor="age">Age (Years)</label>
                    <input
                        id="age"
                        type="number"
                        ref={ageInputRef}
                    />
                    <label htmlFor="college">College</label>
                    <input
                        id="college"
                        type="text"
                        ref={collegeInputRef}>

                    </input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;
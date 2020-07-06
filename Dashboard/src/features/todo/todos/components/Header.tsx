import * as React from 'react';
import TodoTextInput from './TodoTextInput';
import {addTodo} from '../todoSlice';
import { connect } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type PropsType = {
    addTodo: ActionCreatorWithPayload<string>
}

const Header = ({addTodo}:PropsType) => {

    function handleSave(text: string) {
        if (text.length) {
            addTodo(text);
        }
    }

    return (
        <div>
            <h1>Todos</h1>
            <TodoTextInput
                newTodo
                onSave={handleSave}
                placeholder="What needs to be done?" />
        </div>
    );
}

export default connect(null, {addTodo})(Header)

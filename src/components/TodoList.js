import React, { useState, useEffect, Fragment } from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';
import styles from '../styles/todoList.module.css';

const TodoList = ({ todoList, onRemoveTodo, sortTodos, onToggleTodo }) => {
    const [sortOrder, setSortOrder] = useState('none');
    const [completedFilter, setCompletedFilter] = useState('all');
    const [displayedList, setDisplayedList] = useState(todoList);

    useEffect(() => {
        setDisplayedList(todoList);
    }, [todoList]);

    useEffect(() => {
        let sortedAndFilteredList = todoList;

        if (sortOrder !== 'none') {
            sortedAndFilteredList = sortTodos(sortedAndFilteredList, sortOrder);
        }
        // console.log(todoList.map(item => item.fields.Completed));

        if (completedFilter !== 'all') {
            const isCompleted = completedFilter === 'true';
            sortedAndFilteredList = sortedAndFilteredList.filter((item) => item.fields.Completed === true ? isCompleted : !isCompleted);
        }
        setDisplayedList(sortedAndFilteredList);
    }, [sortOrder, completedFilter, todoList, sortTodos]);

    const handleSortSelect = (e) => {
        setSortOrder(e.target.value);
    };

    const handleCompletedFilterSelect = (e) => {
        setCompletedFilter(e.target.value);
    };

    return (
        <>
            <select className={styles.sortSelect} onChange={handleSortSelect}>
                <option value="none">No sorting</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <select className={styles.completedFilterSelect} onChange={handleCompletedFilterSelect}>
                <option value="all">All</option>
                <option value="true">Completed</option>
                <option value="false">Uncompleted</option>
            </select>
            {displayedList.map((item) => (
                <Fragment key={item.id}>
                    <TodoListItem item={item} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                </Fragment>
            ))}
        </>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    sortTodos: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
};

export default TodoList;

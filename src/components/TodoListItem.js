import styles from '../styles/todoListItem.module.css';
import PropTypes from 'prop-types';

const TodoListItem = ({ item, onRemoveTodo, onToggleTodo }) => {
    return (
        <li className={styles.listItem}>
            <div className={styles.listItemTitle}>
                {item.fields.Title}
            </div>
            <div className={styles.listItemCompleted}>
                <input
                    type="checkbox"
                    checked={item.fields.Completed || false}
                    onChange={() => onToggleTodo(item.id)}
                />

            </div>
            <button className={styles.button} type="button" onClick={() => onRemoveTodo(item.id)}>Remove</button>
        </li>
    )
}

TodoListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;

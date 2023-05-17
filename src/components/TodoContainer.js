import { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import fetchApiData from '../utils/apiUtils';


function TodoContainer() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const data = await fetchApiData('fetch', {}, null, process.env.REACT_APP_AIRTABLE_API_KEY_READ);
        const sortedData = sortTodos(data.records, 'asc');
        setTodoList(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoList();
  }, []);

  const addTodo = async (newTodo) => {
    const fields = { ...newTodo };
    try {
      const data = await fetchApiData('add', fields, null, process.env.REACT_APP_AIRTABLE_API_KEY_WRITE);
      const newTodoList = sortTodos([...todoList, data], 'asc');
      setTodoList(newTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await fetchApiData('delete', null, id, process.env.REACT_APP_AIRTABLE_API_KEY_WRITE);
      setTodoList(todoList.filter((el) => el.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (id) => {
    const updatedList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          fields: {
            ...item.fields,
            Completed: !item.fields.Completed,
          },
        };
      }
      return item;
    });
    try {
      await fetchApiData('update', updatedList.find((item) => item.id === id).fields, id, process.env.REACT_APP_AIRTABLE_API_KEY_WRITE);
      setTodoList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const sortTodos = (todos, sortOrder) => {
    const sortedTodos = [...todos];
    if (sortOrder === 'asc') {
      sortedTodos.sort((a, b) => a.fields.Title.localeCompare(b.fields.Title));
    } else if (sortOrder === 'desc') {
      sortedTodos.sort((a, b) => b.fields.Title.localeCompare(a.fields.Title));
    }
    return sortedTodos;
  };


  return (
    <>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onToggleTodo={handleToggleTodo} onRemoveTodo={removeTodo} sortTodos={sortTodos} />}
    </>
  );
}

export default TodoContainer;

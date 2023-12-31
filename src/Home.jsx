import React, { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home(){
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all');
    const [activeButton, setActiveButton] = useState('all');

    useEffect(() => {
        axios.get(`http://localhost:3000/get${filter === 'all' || filter === null ? '' : `ByIsDone/${filter}` }`)
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [filter])

    const handleFilter = (isDone) => {
        setFilter(isDone === 'all'? null : isDone ? true : false);
        setActiveButton(isDone === 'all' ? null :isDone ? 'completed' : 'active');
    };

    const handleEdit = (id, currentIsDone) => {
        axios.put('http://localhost:3000/update/'+id, {isDone : !currentIsDone})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

   const handleDelete = (id) => {
        axios.delete('http://localhost:3000/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    return(
        <div className='home'>
            <h2>Todo List</h2>
            <Create/>
            <br/>
            <div className='filter'>
                <button type="button" onClick={() => handleFilter('all')} className={activeButton === null || activeButton === 'all' ? 'active' : ''}>All</button>
                <button type="button" onClick={() => handleFilter(false)} className={activeButton === 'active' ? 'active' : ''}>Active</button>
                <button type="button" onClick={() => handleFilter(true)} className={activeButton === 'completed' ? 'active' : ''}>Completed</button>
            </div>
            {
                todos.length === 0 ?
                <div>
                    <h2>No Record</h2>
                </div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id, todo.isDone)}>
                            {todo.isDone ? 
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            : <BsCircleFill className='icon'/>
                            }
                            <p className={todo.isDone ? "line_through" : "" }>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon'onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                        
                    </div>
                ))
            }

        </div>
    )
}

export default Home
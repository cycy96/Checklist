import {useEffect, useState } from 'react'
import './styles.css'

export default function App() {
  const [newItem, setnewItem] = useState("")
  
  const [todos, settodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    
    /* add items function */
    settodos(currenttodos => {
      return[
        ...currenttodos,
        { id: crypto.randomUUID(), title:newItem, completed: false }
      ]
    })

    setnewItem("")
  }

  /* check or uncheck the box function */
function toggleTodo(id, completed){
  settodos(currenttodos => {
    return currenttodos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed}
      }

      return todo
    })
  })
}

/* delete function */
function deleteTodo(id) {
  settodos(currentTodos => {
    return currentTodos.filter(todo => todo.id !== id)
  })
}

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>

    <div className='title'>
    <h1>Checklist</h1>
    </div>
    <div className="form-row">
    <label htmlFor='item'><b>New item</b></label>
    </div>
    <input 
    value={newItem} 
    onChange={e => setnewItem(e.target.value)} 
    type="text" 
    id="item">
    </input>
    <div>
    <button className="button">
    Add
    </button>
    </div>
    </form>

    <ul className="list">

      {todos.length === 0 && "Nothing here!"}


      {todos.map(todo => {
        return (
          <li key={todo.id}>
              <label>
                <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} 
                />
                {todo.title}
              </label>
              <button 
              onClick={() => deleteTodo(todo.id)}
              className="buttondel">✘</button>
            </li>
        )
      })}
    </ul>
    </>
  )
}



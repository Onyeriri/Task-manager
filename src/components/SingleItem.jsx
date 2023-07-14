import React, { useState } from 'react'
import { useDeleteTask, useUpdateTask } from '../reactQueryCustomHook';

const SingleItem = ({ item }) => {
    const { id, title, isDone } = item;
    const [state, setState] = useState({
        edit: isDone,
        value: title,
        completed: isDone,
        save: false,
        disableBox: false,
        // create state for checkbox name
        checkBox: '',
        // create state for input name
        input: ''
    });

    // import custom hooks for updating title and completed
    const { updateTask, isUpdating } = useUpdateTask(id);

    // import custom hooks for deleteing single task with an  and completed
    const { deleteTask, isDeleting } = useDeleteTask(id);
    
    // handle single task update through editing the title
    const handleTaskUpdate = () => {
        if (!state.value) {
            return
        }
        
        // use updateTask method in useUpdateTasks hooks to execute title update on a single task with specified id
        updateTask({[state.input]: state.value});

        setState((prevState) => {
            return {
                ...prevState, edit: !state.edit, save: !state.save,
                disableBox: !state.disableBox
            };
        });
    }

    const handleEdit = () => {
        // update state with relevant state items
        setState((prevState) => {
            return {
                ...prevState, edit: !state.edit, save: !state.save, disableBox: !state.disableBox
            };
        });
    }

    const handleCheckbox = (e) => {
        //  update the state with relevant state changes
        setState((prevState) => {
            return {
                ...prevState, [state.checkBox]: e.target.name, edit: !state.edit, completed: e.target.checked
            }
        })
        
        // use updateTask method in useUpdateTasks hooks to execute completed task update on a single task with a specified id 
        updateTask({[state.checkBox]: state.completed})

    }

    // delete a single task from tasks lists
    const handleDeleteItem = () => {
        deleteTask()
    }

    // display loading for user when either updating and deleting is in progress
    if (isUpdating || isDeleting) {
        return <h4 style={{textAlign: 'center'}}>Loading please wait...</h4>
    }

  return (
      <div className='single-item'>
          <input
              onChange={handleCheckbox}
              type="checkbox"
              name="isDone"
              id="completed"
              checked={state.completed}
              disabled={state.disableBox}
          />
          {state.save ?
              (<input 
                  value={state.value}
                  name='title'
                  onChange={(e) => {
                      setState((prevState) => {
                          return {
                              ...prevState, value: e.target.value, input: e.target.name
                          }
                      })
                  }}
              />)
              :
              (<p
              style={state.completed ? { textDecoration: 'line-through', textTransform: 'capitalize' } : { textDecoration: 'none', textTransform: 'capitalize' }}
          >
              {title}
          </p>)}
          
          
          {state.edit
              &&
              (
                      <>
                          <button className='remove-btn' onClick={() => handleEdit(id)} type="button"
                          >
                              Edit
                          </button>
                          <button className='remove-btn' onClick={handleDeleteItem} type="button">delete</button>
                      </>
              )
              
              }
                  
          {state.save &&
              (
                      <>
                      <button
                          className='remove-btn' onClick={() => handleTaskUpdate(id)}
                          type="button"
                      >
                          Save
                      </button>
                        <button
                            className='remove-btn' onClick={() => handleRemoveItem(id)} type="button"
                        >
                            delete
                        </button>
                     </>
          ) 
          }
          
      </div>
  )
}

export default SingleItem
import React, { useState } from 'react';
import { useCreateTask } from '../reactQueryCustomHook';

const Form = () => {
    const [value, setValue] = useState('');
    // custom hook for creating task
    const { createTask } = useCreateTask();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // method from custom hook that executes creating a single task
        createTask(value);
        setValue('');
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h4>grocery bud</h4>
                <div className='form-control'>
                <input
                    className='form-input'
                    type="text"
                    name="text"
                    id="text" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='What do you need, today?'
                />
                    <button className='btn' type="submit">Add item</button>
                </div>
            </form>
        </section>
    )
}

export default Form
import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import morgan from 'morgan';

export let taskLists = [
    {
        id: nanoid(), title: 'walk the dog', isDone: false
    },
    {
        id: nanoid(), title: 'wash dishes', isDone: false
    },
    {
        id: nanoid(), title: 'drink coffee', isDone: false
    },
    {
        id: nanoid(), title: 'take a nap', isDone: false
    },
]

const app = express();


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!!!');
})

app.get('/api/tasks', (req, res) => {
    res.status(200).json({ taskLists });
})

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        res.status(400).json({ msg: 'Please provide title' });
        return;
    }

    const newTask = {
        id: nanoid(),
        title,
        isDone: false
    }

    taskLists = [...taskLists, newTask];
    res.status(201).json(newTask);
})


app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title: newTitle, isDone: isDoneReq } = req.body;

    const ids = taskLists.map((task) => task.id);

    const result = ids.includes(id);

    if (!result) {
        res.status(404).json({ msg: 'File not found' });
        return;
    }


    const newTasks = taskLists.map((taskList) => {
        if (taskList.id === id) {
            const { id, isDone, title } = taskList;

            return {
                id : id,
                title: newTitle ?? title,
                isDone: isDoneReq ?? false
            };
        }

        return taskList;
    });

    taskLists = [...newTasks];

    res.status(204).json({ msg: 'task updated' });

});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    const ids = taskLists.map((task) => task.id);

    const result = ids.includes(id);

    if (!result) {
        res.status(404).json({ msg: 'File not found' });
        return;
    }
    
    taskLists = taskLists.filter((taskList) => taskList.id !== id);

    res.status(202).json({ msg: 'task removed' });
})

app.use((req, res) => {
    res.status(404).json('Route does not exit')
})

const PORT = process.env.PORT || 5000;

const startApp = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}...`);
        })
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

startApp();


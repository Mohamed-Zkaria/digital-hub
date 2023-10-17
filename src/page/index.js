import { useState } from "react"

export default function Page(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [progress, setProgress] = useState("not started")
    const [tasks, setTasks] = useState([]);

    function handleSubmit(e){
        e.preventDefault()
        if(title && description && progress){
            let newTasks = tasks.slice()
            newTasks.push({
                title,
                description,
                progress
            });
            setTasks(newTasks);
        }
    }

    function handleTitleChange(e){
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    function handleProgressChange(e){
        setProgress(e.target.text)
    }

    const list = tasks.map(task =>
        <div >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.progress}</p>
        </div>
    )

    return (
        <main className="main">
            <h1>Tasks</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={handleTitleChange}/>
                <textarea value={description} onChange={handleDescriptionChange}></textarea>
                <select onChange={handleProgressChange} value={progress}>
                <option value="not started">not started</option>
                    <option value="in progress">in progress</option>
                    <option value="finished">finished</option>
                </select>
                <input type="submit" value="submit"/>
            </form>

            <ul className='tasks-display'>
                {list}
            </ul>
        </main>
    )
}
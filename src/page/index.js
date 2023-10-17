import { useState } from "react"
import './page.css'
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
            newTasks = setTasks(newTasks);
            setTitle("");
            setDescription("");
            setProgress("not started");
        }
    }

    function handleTitleChange(e){
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    function handleProgressChange(e){
        setProgress(e.target.value)
    }

    function getStyleName(progress){
        if (progress === "not started"){
            return 'notstarted'
        }

        if (progress === "in progress"){
            return 'inprogress'
        }

        if (progress === "finished"){
            return 'finished'
        }
    }

    function handleDeleteTask(e){
        let targetIndex = parseInt(e.target.dataset.index)
        let newTasks = tasks.filter((row,index)=>{
            return targetIndex !== index;
        });
        setTasks(newTasks);
    }

    const list = tasks.map((task, index) =>
        {
            let styleName = getStyleName(task.progress);
            return (
                <div key={index}className={styleName}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.progress}</p>
                    <button data-index={index} onClick={handleDeleteTask}>Delete</button>
                </div>
            )
        }
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
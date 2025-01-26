
function From(props) {
    return (
        <div className="wrapper">
            <header>
                <h3>🔰 TO DO LIST </h3>
            </header>

            <form className="input-box">
                <input type="text" ref={props.newTask} placeholder="Add Your Task" />
                <button type="submit" onClick={props.addTaks}>Add Task</button>
            </form>
        </div>
    )
}

export default From
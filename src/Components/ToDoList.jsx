import TodolistButton from './TodolistButton.jsx';

function ToDoList(props) {
    if (!Array.isArray(props.tasks)) {
        return <div>No tasks available</div>;
    }

    const sortedTasks = [...props.tasks].sort((a, b) => b.id - a.id);

    return (
        <div className="wrapper">
            <ul>
                {sortedTasks.map((item) => (
                    <li key={item.id}>
                        <div className="left">
                            <button onClick={() => props.setCompleted(item.id)}>
                                {item.completed ? '✅' : '◻️'}
                            </button>
                        </div>
                        <div className={`center ${item.completed ? 'strike' : ''}`}>
                            {item.task}
                        </div>
                        <div className="right">
                            <TodolistButton
                                id={item.id}
                                tasks={props.tasks}
                                move={props.move}
                                remove={props.remove}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;

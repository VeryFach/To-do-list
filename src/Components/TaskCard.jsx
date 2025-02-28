import Tag from "../components/Tag";
import deleteIcon from "../assets/delete.png";
import "./TaskCard.css";

const TaskCard = ({ title, tags, handleDelete, index, handleStatusChange, createdAt, status }) => {
    const calculateTimeElapsed = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays} hari yang lalu`;
        } else if (diffHours > 0) {
            return `${diffHours} jam yang lalu`;
        } else {
            return `${diffMinutes} menit yang lalu`;
        }
    };

    return (
        <article className='task_card'>
            <p className='task_text'>{title}</p>
            <p className='task_time'>{calculateTimeElapsed(createdAt)}</p>
            <div className='task_card_bottom_line'>
                <div className='task_card_tags'>
                    {tags.map((tag, index) => (
                        <Tag key={index} tagName={tag} selected />
                    ))}
                </div>
                <div className="task_actions">
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="status_dropdown"
                    >
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <div className='task_delete' onClick={() => handleDelete(index)}>
                        <img src={deleteIcon} className='delete_icon' alt='' />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
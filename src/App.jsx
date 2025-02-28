import React, { useEffect, useState } from "react";
import "./App.css";
import doneIcon from "./assets/check-mark-button.png";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import taskPileBackground from "./assets/aset2.jpg";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [sortBy, setSortBy] = useState("all"); // State untuk menyimpan pilihan sorting

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const sortTasks = (tasks, sortBy) => {
    const now = new Date();
    return tasks.filter((task) => {
      const createdDate = new Date(task.createdAt);
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (sortBy === "week") {
        return diffDays <= 7;
      } else if (sortBy === "month") {
        return diffDays <= 30;
      } else if (sortBy === "year") {
        return diffDays <= 365;
      } else {
        return true;
      }
    });
  };

  const handleStatusChange = (taskIndex, newStatus) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const sortedTasks = sortTasks(tasks, sortBy);

  return (
    <div className="app">
      {/* Tambahkan elemen untuk teks dan background */}
      <div className="hero_section">
        <div className="hero_content">
          <h1>Buat tugas Anda lebih terjadwal dan tertata</h1>
        </div>
      </div>
      <TaskForm setTasks={setTasks} />
      <div className="sorting_options">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">All</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={sortedTasks}
          status="todo"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={sortedTasks}
          status="doing"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={sortedTasks}
          status="done"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
};

export default App;
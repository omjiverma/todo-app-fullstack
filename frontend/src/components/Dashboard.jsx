import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

import Alert from "./Alert";
import alertState from "../Atoms/alert.atom";
import userState from "../Atoms/user.atom";
import removeUserFromLocalStorage from "../utils/removeUserFromLocalStorage";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const { user } = userData;

  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([,]);

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/task");
      const { allTasks } = response.data;
      setTaskList(allTasks);
      setTaskInput("")
    } catch (error) {
      const message = error.response.data.msg;
      if (message === "Invalid Authentication") {
        removeUserFromLocalStorage();
        setUserData({ userId: "", user: "", email: "" });
      }
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleEditTask = (id) => {
    const specificTask = taskList.find((item) => item._id === id);
    setIsEditing(true);
    setTaskInput(specificTask.task);
    setEditingTaskId(specificTask._id)
  };

  const handleEditSubmit = async() => {
    try {
      const updatedTask = { task: taskInput };
      const response = await axios.patch(`api/v1/task/${editingTaskId}`, updatedTask);
      fetchAllTasks();
      setIsEditing(false);
      setTaskInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async() => {
    try {
      const response = await axios.post('api/v1/task', { task: taskInput });
      fetchAllTasks();
    } catch (error) {
      
    }
  };

  const handleDeleteTask = async(id) => {
    const response = await axios.delete(`api/v1/task/${id}`);
    fetchAllTasks();
  };

  return (
    <main className='flex flex-col items-center drop-shadow-xl min-h-[67vh]'>
      <div className='max-w-sm w-full border rounded-lg mx-auto px-3 py-4  my-10'>
        <h1 className='text-xl font-bold mt-1 text-center'>
          {user}'s Todo Dashboard{" "}
        </h1>

        <div className='flex justify-center my-6'>
          <input
            type='text'
            placeholder='Enter your todo'
            value={taskInput}
            onChange={handleChange}
            className='bg-slate-100 border-0 focus:outline-none focus:ring-0'
          />
          <button onClick={!isEditing? handleAddTask: handleEditSubmit} className='px-2 py-2 w-20 bg-[#FF4F5A] text-white hover:drop-shadow-md'>
            {!isEditing ? "Add Task" : "Edit"}
          </button>
        </div>

        <div className='my-4 flex flex-col px-6'>
          {taskList.map((taskItem) => {
            return (
              <div
                key={taskItem._id}
                className='my-1 py-2 px-2 flex justify-between shadow-lg'
              >
                <p className='text-slate-600'>{taskItem.task}</p>
                <div className='flex'>
                  <PencilSquareIcon
                    onClick={() => handleEditTask(taskItem._id)}
                    className='w-5  mx-1 text-green-500 hover:scale-110'
                  />
                  <TrashIcon onClick={() => handleDeleteTask(taskItem._id)} className='w-5  mx-1 text-[#FF4F5A] hover:scale-110' />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

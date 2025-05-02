import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

export default function ProjectTasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks for this project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  if (loading) return <div className="p-4 text-center">Loading tasks...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found for this project.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
                <p className="text-sm text-gray-400">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
              <button className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                View/Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

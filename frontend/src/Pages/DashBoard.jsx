import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/projects", {
        withCredentials: true,
      });
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load projects. Please login again.");
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!newProject.title.trim()) {
      setError("Project title is required");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:3000/api/projects", 
        { title: newProject.title },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Success case
      setProjects([...projects, res.data]);
      setNewProject({ title: "", description: "" });
      setShowCreateForm(false);
      setError("");
  
    } catch (err) {
      let errorMessage = "Failed to create project";
      
      if (err.response) {
        // Handle project limit error
        if (err.response.status === 403) {
          errorMessage = "You've reached your project limit (4 projects max)";
        }
        // Handle validation errors
        else if (err.response.status === 400) {
          errorMessage = err.response.data.message || "Invalid project data";
        }
        // Handle authentication errors
        else if (err.response.status === 401) {
          errorMessage = "Please login again";
          navigate("/login");
          return;
        }
        // Handle other server errors
        else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
      console.error("Project creation error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Project
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {showCreateForm && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}

        {projects.length === 0 && !showCreateForm ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No projects found.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow p-4 border hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <button
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Tasks
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
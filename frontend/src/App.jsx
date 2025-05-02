import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/DashBoard';
import ProjectTasks from './pages/ProjectTasks';
import LandingPage from './Pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">


        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/projects/:projectId" element={<ProjectTasks />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

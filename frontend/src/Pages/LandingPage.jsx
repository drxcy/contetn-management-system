import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">TaskFlow</div>
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Organize Your Work, <span className="text-indigo-600">Simplify Your Life</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          TaskFlow helps you manage projects and tasks efficiently so you can focus on what really matters.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            Get Started Free
          </Link>
          <Link 
            to="/features" 
            className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition text-lg"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, organize, and prioritize tasks with ease. Set deadlines and track progress.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
              <p className="text-gray-600">
                Manage multiple projects with our intuitive dashboard and progress indicators.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-indigo-600 text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Never miss a deadline with our notification system and calendar integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "TaskFlow has completely transformed how I organize my work. I'm 2x more productive now!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "The clean interface and powerful features make this my go-to task manager."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to boost your productivity?
          </h2>
          <Link 
            to="/signup" 
            className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            Start Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">TaskFlow</div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-indigo-300">Privacy</Link>
              <Link to="/terms" className="hover:text-indigo-300">Terms</Link>
              <Link to="/contact" className="hover:text-indigo-300">Contact</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-gray-400 text-sm">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
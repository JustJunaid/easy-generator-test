import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/signin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to the Dashboard
            </h1>
            {user && (
              <div className="space-y-2">
                <p className="text-xl text-gray-700">
                  Hello, <span className="font-semibold">{user.name}</span>
                </p>
                <p className="text-gray-600">
                  We're excited to have you here. This is your personal
                  dashboard.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-8 py-3 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

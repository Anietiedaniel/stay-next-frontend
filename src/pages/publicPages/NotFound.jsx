import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-red-800 mb-4">404</h1>
      <p className="text-xl text-red-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
      >
        Go Home
      </Link>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        Developed by <span className="font-semibold text-black">CIEOS Developers</span> at{' '}
        <span className="font-semibold text-black">CIEOS Technologies</span>
      </footer>
    </div>
  );
};

export default NotFoundPage;

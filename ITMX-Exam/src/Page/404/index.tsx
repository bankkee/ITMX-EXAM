import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <button
        onClick={handleBackToHome}
        className="btn-animate py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out bg-blue-400"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;

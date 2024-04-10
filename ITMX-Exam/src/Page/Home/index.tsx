import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "../../UI/ToggleTheme";

interface Iprops {}

const Home: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="absolute right-10 top-10">
        <ToggleTheme />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to My Project</h1>
      <button
        className="btn-animate py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out bg-blue-400"
        onClick={() => {
          navigate("/shop");
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;

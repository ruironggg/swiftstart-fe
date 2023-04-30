import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <PacmanLoader color={"#06d6a0"} loading={true} />
      <p className="text-center mt-4 text-[#06d6a0] font-medium">
        Generating documentation...
      </p>
    </div>
  );
};

export default Loader;

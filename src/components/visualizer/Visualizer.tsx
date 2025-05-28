import SocialGraph from "./components/graph_component/SocialGraph";
import Suggestions from "./components/Suggestions";
import UserInfo from "./components/UserInfo";

const Visualizer = () => {
  return (
    <div className="flex flex-col lg:flex-row relative h-fit">
      <div className="lg:w-[20%] w-full h-20 lg:h-full">
        <Suggestions/>
      </div>
      <div className="lg:w-[60%] w-full flex-1 px-4 bg-gray-100">
        <SocialGraph/>
      </div>
      <div className="lg:w-[20%] w-full">
        <UserInfo/>
      </div>
    </div>
  );
};

export default Visualizer;

import ChatBox from "../components/ChatBot";
import Navbar from "./layout/Navbar";
import SideBar from "./layout/SideBar";


const Dashboard = () => {
  return (
    <>
    <div className="flex gap-4 bg-gray-100 h-screen">
    <SideBar/>

    <div className="mt-10 w-full mx-6">
      <Navbar/>
      <ChatBox/>
    </div>
    </div>
    </>
  );
}

export default Dashboard;

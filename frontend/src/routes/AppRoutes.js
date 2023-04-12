import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import TokenInfo from "../pages/TokenInfo";
import AllTasks from "../pages/AllTasks";
import UserTasks from "../pages/UserTasks";
import CreateTask from "../pages/CreateTask";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/token" element={<TokenInfo/>}/>
            <Route path="/tasks" element={<AllTasks/>}/>
            <Route path="/mytasks" element={<UserTasks/>}/>
            <Route path="/newtask" element={<CreateTask/>}/>
        </Routes>
    )
};

export default AppRoutes;
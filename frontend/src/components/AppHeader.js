import {useLocation} from "react-router-dom";

const AppHeader = () => {

    const location = useLocation();

    return (
        <>
            <div>{location.pathname}</div>
        </>
    );
};

export default AppHeader;
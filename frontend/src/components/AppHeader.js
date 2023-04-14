import {useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";

const AppHeader = () => {

    const location = useLocation();

    return (
        <Box>
            <Typography variant="caption">{location.pathname}</Typography>
        </Box>
    );
};

export default AppHeader;
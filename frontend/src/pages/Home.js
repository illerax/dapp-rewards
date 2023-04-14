import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {

    return (
        <>
            <Box sx={{margin: 5}}>
                <Typography variant="h4">Home</Typography>
            </Box>
            <Box sx={{marginLeft: 50}}>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <Typography variant="h6">Crypto Rewards Application</Typography>
                <Typography variant="body" component="p">View list of available to complete tasks
                    <Link to={"/tasks"}> ===> </Link>
                </Typography>
                <Typography variant="body" component="p">Complete them and earn
                    <Link to={"/token"}> REWARD </Link>
                    token</Typography>
                <Typography variant="body" component="p">Or create your own tasks
                    <Link to={"/newtask"}> ===> </Link>
                </Typography>
                <Typography variant="body" component="p">
                    and approve already completed
                    <Link to={"/mytasks"}> ===> </Link>
                </Typography>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
                <img src={process.env.PUBLIC_URL + '/logo.png'} width="50vw"/>
            </Box>
        </>
    );
};

export default Home;
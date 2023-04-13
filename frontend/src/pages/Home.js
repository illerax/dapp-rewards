import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from '../store/counterSlice'

const Home = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <>
            <Typography variant="h4">Home</Typography>
        </>
    );
};

export default Home;
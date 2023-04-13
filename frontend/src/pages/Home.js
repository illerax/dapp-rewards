import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from '../store/counterSlice'

const Home = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <>
            <Typography variant="h4">Home</Typography>
            <Typography variant="h6">{count}</Typography>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        </>
    );
};

export default Home;
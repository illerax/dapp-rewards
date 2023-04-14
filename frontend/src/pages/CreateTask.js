import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS, REWARD_TOKEN_CONTRACT_ADDRESS} from "../constants";
import managementTaskJson from "managementAbiJson";
import {useDispatch} from "react-redux";
import {open as openModal} from '../store/modalSlice';
import {close as closeBackdrop, open as openBackdrop} from '../store/backdropSlice';
import {useNavigate} from "react-router-dom";

const CreateTask = () => {

    const [description, setDescription] = useState("");
    const [rewardSum, setRewardSum] = useState(0);
    const {isConnected} = useAccount();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setRewardSumValue = (val) => {
        setRewardSum(val ? val : rewardSum);
    }

    const {config} = usePrepareContractWrite({
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
        functionName: 'createTask',
        args: [
            description,
            rewardSum,
            REWARD_TOKEN_CONTRACT_ADDRESS
        ]
    });

    const contractWrite = useContractWrite({
        ...config,
        onError(error) {
            dispatch(closeBackdrop());
            dispatch(openModal(`Error: ${error.message}`));
        }
    });

    useWaitForTransaction({
        hash: contractWrite.data?.hash,
        onError(error) {
            dispatch(openModal(`Error: ${error.message}`));
        },
        onSuccess(data) {
            navigate('/mytasks');
        },
        onSettled(data, error) {
            dispatch(closeBackdrop());
        }
    })

    const createTask = () => {
        if (description.length < 1) {
            dispatch(openModal("Please, add a description!"));
        } else if (rewardSum <= 0) {
            dispatch(openModal("Please, add a reward!"));
        } else {
            dispatch(openBackdrop());
            contractWrite.write?.();
        }
    }

    return (
        <Box>
            <Typography variant="h4">Create task</Typography>
            <Typography variant="body1"></Typography>
            <div>
                <TextField label="Task Description"
                           value={description}
                           onInput={event => setDescription(event.target.value)}
                           variant="outlined"
                           size="small"
                           margin="normal"
                           fullWidth
                           multiline
                           rows={5}/>
            </div>
            <div>
                <TextField label="Reward"
                           value={rewardSum}
                           onInput={event => setRewardSumValue(event.target.value)}
                           variant="outlined"
                           type="number"
                           size="small"
                           margin="normal"/>
            </div>
            <div>
                <Button size="medium"
                        disabled={!isConnected}
                        onClick={() => createTask()}
                        variant="contained">
                    Create
                </Button>
            </div>
        </Box>
    );
};

export default CreateTask;
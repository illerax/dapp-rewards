import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useContractWrite, usePrepareContractWrite} from "wagmi";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS, REWARD_TOKEN_CONTRACT_ADDRESS} from "../constants";
import managementTaskJson from "managementAbiJson";

const CreateTask = () => {

    const [description, setDescription] = useState("");
    const [rewardSum, setRewardSum] = useState(0);

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

    const {write} = useContractWrite(config);

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
                        onClick={() => write()}
                        variant="contained">
                    Create
                </Button>
            </div>
        </Box>
    );
};

export default CreateTask;
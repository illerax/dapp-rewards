import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useAccount, useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import rewardTaskJson from "taskAbiJson";
import {Link, useParams} from "react-router-dom";
import {formatUnits} from "ethers/lib/utils";
import {ethers} from "ethers";
import {useDispatch} from "react-redux";
import {close as closeBackdrop, open as openBackdrop} from '../store/backdropSlice';
import {open as openModal} from "../store/modalSlice";

const ShowTask = () => {

    const {address} = useParams();
    const dispatch = useDispatch();
    const {isConnected} = useAccount();

    const taskContract = {
        address: address,
        abi: rewardTaskJson.abi,
    }

    const {data, refetch} = useContractReads({
        contracts: [
            {
                ...taskContract,
                functionName: 'getRewardToken',
            },
            {
                ...taskContract,
                functionName: 'getRewardAmount',
            },
            {
                ...taskContract,
                functionName: 'getDescription',
            },
            {
                ...taskContract,
                functionName: 'getPayee',
            }
        ],
    });

    const isDisabled = isConnected && data ? data[3] !== ethers.constants.AddressZero : true;

    const {config} = usePrepareContractWrite({
        ...taskContract,
        functionName: 'completeTask',
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
            dispatch(openModal(`The task is marked as COMPLETED. Waiting for owner's approval`));
            refetch?.();
        },
        onSettled(data, error) {
            dispatch(closeBackdrop());
        }
    });

    const completeTask = () => {
        dispatch(openBackdrop());
        contractWrite.write?.();
    }

    return (
        <Box>
            <Typography variant="h4">Show task</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow key="show-task-token">
                            <TableCell align="right" component="th" scope="row">Reward token:</TableCell>
                            <TableCell align="left">{data ? <Link to={'/token'}>{data[0]}</Link> : ""}</TableCell>
                        </TableRow>
                        <TableRow key="show-task-reward">
                            <TableCell align="right" component="th" scope="row">Reward amount:</TableCell>
                            <TableCell align="left">{formatUnits(data ? data[1] : 0)}</TableCell>
                        </TableRow>
                        <TableRow key="show-task-description">
                            <TableCell align="right" component="th" scope="row">Description:</TableCell>
                            <TableCell align="left">{data ? data[2] : ""}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Button size="medium"
                        disabled={isDisabled}
                        onClick={() => completeTask()}
                        variant="contained">
                    Mark as completed
                </Button>
            </div>
        </Box>
    );
};

export default ShowTask;
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useAccount, useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import rewardTaskJson from "taskAbiJson";
import managementTaskJson from "managementAbiJson";
import {Link, useNavigate, useParams} from "react-router-dom";
import {formatUnits} from "ethers/lib/utils";
import {ethers} from "ethers";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS} from "../constants";
import {useDispatch} from "react-redux";
import {close as closeBackdrop, open as openBackdrop} from '../store/backdropSlice';
import {open as openModal} from "../store/modalSlice";

const ApproveTask = () => {

    const {address} = useParams();
    const {isConnected} = useAccount();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const taskContract = {
        address: address,
        abi: rewardTaskJson.abi,
    }

    const managementContract = {
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
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

    const isDisabled = !isConnected || !data || data[3] === ethers.constants.AddressZero;

    const {config: approveConfig} = usePrepareContractWrite({
        ...managementContract,
        functionName: 'approve',
        args: [address]
    });

    const {config: rejectConfig} = usePrepareContractWrite({
        ...managementContract,
        functionName: 'reject',
        args: [address]
    });

    const approveAction = useContractWrite({
        ...approveConfig,
        onError(error) {
            dispatch(closeBackdrop());
            dispatch(openModal(`Error: ${error.message}`));
        }
    });
    const rejectAction = useContractWrite({
        ...rejectConfig,
        onError(error) {
            dispatch(closeBackdrop());
            dispatch(openModal(`Error: ${error.message}`));
        }
    });

    const approve = () => {
        dispatch(openBackdrop());
        approveAction.write?.()
    }

    const reject = () => {
        dispatch(openBackdrop());
        rejectAction.write?.()
    }

    useWaitForTransaction({
        hash: approveAction.data?.hash,
        onError(error) {
            dispatch(openModal(`Error: ${error.message}`));
        },
        onSuccess(data) {
            dispatch(openModal(`The task was APPROVED`));
            navigate('/mytasks');
        },
        onSettled(data, error) {
            dispatch(closeBackdrop());
        }
    });

    useWaitForTransaction({
        hash: rejectAction.data?.hash,
        onError(error) {
            dispatch(openModal(`Error: ${error.message}`));
        },
        onSuccess(data) {
            dispatch(openModal(`The task was REJECTED`));
            refetch?.();
        },
        onSettled(data, error) {
            dispatch(closeBackdrop());
        }
    });

    return (
        <Box>
            <Typography variant="h4">Approval</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow key="approve-task-token">
                            <TableCell align="right" component="th" scope="row">Reward token:</TableCell>
                            <TableCell align="left">{data ? <Link to={'/token'}>{data[0]}</Link> : ""}</TableCell>
                        </TableRow>
                        <TableRow key="approve-task-reward">
                            <TableCell align="right" component="th" scope="row">Reward amount:</TableCell>
                            <TableCell align="left">{formatUnits(data ? data[1] : 0)}</TableCell>
                        </TableRow>
                        <TableRow key="approve-task-description">
                            <TableCell align="right" component="th" scope="row">Description:</TableCell>
                            <TableCell align="left">{data ? data[2] : ""}</TableCell>
                        </TableRow>
                        <TableRow key="approve-task-payee">
                            <TableCell align="right" component="th" scope="row">Payee:</TableCell>
                            <TableCell
                                align="left">{data && data[3] !== ethers.constants.AddressZero ? data[3] : ""}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Button size="medium"
                        disabled={isDisabled}
                        onClick={() => approve()}
                        variant="contained">
                    Approve
                </Button>
                <Button size="medium"
                        disabled={isDisabled}
                        onClick={() => reject()}
                        variant="contained">
                    Reject
                </Button>
            </div>
        </Box>
    );
};

export default ApproveTask;
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useContractReads, useContractWrite, usePrepareContractWrite} from "wagmi";
import rewardTaskJson from "taskAbiJson";
import managementTaskJson from "managementAbiJson";
import {Link, useParams} from "react-router-dom";
import {formatUnits} from "ethers/lib/utils";
import {ethers} from "ethers";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS} from "../constants";

const ApproveTask = () => {

    const {address} = useParams();

    const taskContract = {
        address: address,
        abi: rewardTaskJson.abi,
    }

    const managementContract = {
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
    }

    const {data} = useContractReads({
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

    const isDisabled = !data || data[3] === ethers.constants.AddressZero;

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

    const {write: approveAction} = useContractWrite(approveConfig);
    const {write: rejectAction} = useContractWrite(rejectConfig);

    return (
        <Box>
            <Typography variant="h4">Approval</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow key="token-address">
                            <TableCell align="right" component="th" scope="row">Reward token:</TableCell>
                            <TableCell align="left">{data ? <Link to={'/token'}>{data[0]}</Link> : ""}</TableCell>
                        </TableRow>
                        <TableRow key="token-name">
                            <TableCell align="right" component="th" scope="row">Reward amount:</TableCell>
                            <TableCell align="left">{formatUnits(data ? data[1] : 0)}</TableCell>
                        </TableRow>
                        <TableRow key="token-symbol">
                            <TableCell align="right" component="th" scope="row">Description:</TableCell>
                            <TableCell align="left">{data ? data[2] : ""}</TableCell>
                        </TableRow>
                        <TableRow key="token-symbol">
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
                        onClick={() => approveAction?.()}
                        variant="contained">
                    Approve
                </Button>
                <Button size="medium"
                        disabled={isDisabled}
                        onClick={() => rejectAction?.()}
                        variant="contained">
                    Reject
                </Button>
            </div>
        </Box>
    );
};

export default ApproveTask;
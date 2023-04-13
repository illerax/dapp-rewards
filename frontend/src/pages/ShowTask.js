import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useContractReads, useContractWrite, usePrepareContractWrite} from "wagmi";
import rewardTaskJson from "taskAbiJson";
import {Link, useParams} from "react-router-dom";
import {formatUnits} from "ethers/lib/utils";
import {ethers} from "ethers";

const ShowTask = () => {

    const {address} = useParams();

    const taskContract = {
        address: address,
        abi: rewardTaskJson.abi,
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

    const isDisabled = data ? data[3] !== ethers.constants.AddressZero : true;

    const {config} = usePrepareContractWrite({
        ...taskContract,
        functionName: 'completeTask',
    });

    const {write} = useContractWrite(config);

    return (
        <Box>
            <Typography variant="h4">Show task</Typography>
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
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Button size="medium"
                        disabled={isDisabled}
                        onClick={() => write()}
                        variant="contained">
                    Mark as completed
                </Button>
            </div>
        </Box>
    );
};

export default ShowTask;
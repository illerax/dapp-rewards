import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useContractRead, useContractReads} from "wagmi";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS} from "../constants";
import managementTaskJson from "managementAbiJson";
import rewardTaskJson from "taskAbiJson";
import {Link} from "react-router-dom";
import {formatUnits} from "ethers/lib/utils";

const AllTasks = () => {

    const contracts = useContractRead({
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
        functionName: "getTasks"
    }).data;

    return (
        <Box>
            <Typography variant="h4">All tasks</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Task</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            <TableCell align="left">Reward</TableCell>
                            <TableCell align="left">Completed by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contracts ? contracts.map((it, index) => {
                            return <TaskRow index={index}
                                            address={it}/>
                        }) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const TaskRow = ({address, index}) => {

    const managementContract = {
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
    }

    const contract = {
        address: address,
        abi: rewardTaskJson.abi,
    }

    const {data} = useContractReads({
        contracts: [
            {
                ...managementContract,
                functionName: 'getTaskOwner',
                args: [address]
            },
            {
                ...contract,
                functionName: 'getRewardAmount'
            },
            {
                ...contract,
                functionName: 'payee'
            }
        ],
    });

    return (
        <TableRow key={`${address}-address`}>
            <TableCell align="left" component="th" scope="row">{index}</TableCell>
            <TableCell align="left" component="th" scope="row"><Link
                to={`/tasks/${address}`}>{address}</Link></TableCell>
            <TableCell align="left" component="th" scope="row">{data ? data[0] : ""}</TableCell>
            <TableCell align="left" component="th" scope="row">{formatUnits(data ? data[1] : 0)}</TableCell>
            <TableCell align="left" component="th" scope="row">{data ? data[2] : ""}</TableCell>
        </TableRow>
    );
};

export default AllTasks;
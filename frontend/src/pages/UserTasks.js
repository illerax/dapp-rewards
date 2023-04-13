import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useAccount, useContractRead, useContractReads} from "wagmi";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS} from "../constants";
import managementTaskJson from "managementAbiJson";
import {Link} from "react-router-dom";

const UserTasks = () => {

    const {address} = useAccount();

    const contracts = useContractRead({
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
        functionName: "getOwnerTasks",
        args: [address]
    }).data;

    return (
        <Box>
            <Typography variant="h4">My Opened Tasks</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Task</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contracts ? contracts.map((it, index) => {
                            return <TableRow key={`${it}-address`}>
                                <TableCell align="left" component="th" scope="row">{index}</TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    <Link to={`/mytasks/${it}`}>{it}</Link>
                                </TableCell>
                            </TableRow>
                        }) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTasks;
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useContractRead} from "wagmi";
import {REWARD_MANAGEMENT_CONTRACT_ADDRESS} from "../constants";
import managementTaskJson from "managementAbiJson";

const UserTasks = () => {
    const contracts = useContractRead({
        address: REWARD_MANAGEMENT_CONTRACT_ADDRESS,
        abi: managementTaskJson.abi,
        functionName: "getOwnerTasks"
    }).data;

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {contracts ? contracts.map((it, index) => {
                        return <TableRow key={`${it}-address`}>
                            <TableCell align="left" component="th" scope="row">{index}</TableCell>
                            <TableCell align="left" component="th" scope="row">{it}</TableCell>
                        </TableRow>
                    }) : ""}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTasks;
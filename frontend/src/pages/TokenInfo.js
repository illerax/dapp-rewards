import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {REWARD_TOKEN_CONTRACT_ADDRESS} from "../constants";
import {useContractReads} from "wagmi";
import tokenTaskJson from "tokenAbiJson";
import {formatUnits} from "ethers/lib/utils";

const TokenInfo = () => {

    const tokenContract = {
        address: REWARD_TOKEN_CONTRACT_ADDRESS,
        abi: tokenTaskJson.abi,
    }

    const {data} = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'name',
            },
            {
                ...tokenContract,
                functionName: 'symbol',
            },
            {
                ...tokenContract,
                functionName: 'decimals',
            },
            {
                ...tokenContract,
                functionName: 'totalSupply',
            }
        ],
    });

    return (
        <Box>
            <Box sx={{margin: 5}}>
                <Typography variant="h4">Show token</Typography>
            </Box>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow key="token-address">
                            <TableCell align="right" component="th" scope="row">Token address:</TableCell>
                            <TableCell align="left">{REWARD_TOKEN_CONTRACT_ADDRESS}</TableCell>
                        </TableRow>
                        <TableRow key="token-name">
                            <TableCell align="right" component="th" scope="row">Name:</TableCell>
                            <TableCell align="left">{data ? data[0] : ""}</TableCell>
                        </TableRow>
                        <TableRow key="token-symbol">
                            <TableCell align="right" component="th" scope="row">Symbol:</TableCell>
                            <TableCell align="left">{data ? data[1] : ""}</TableCell>
                        </TableRow>
                        <TableRow key="token-decimals">
                            <TableCell align="right" component="th" scope="row">Decimals:</TableCell>
                            <TableCell align="left">{data ? data[2] : ""}</TableCell>
                        </TableRow>
                        <TableRow key="token-total-supply">
                            <TableCell align="right" component="th" scope="row">Total supply:</TableCell>
                            <TableCell align="left">{data && data[3] ? formatUnits(data[3]) : 0}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TokenInfo;
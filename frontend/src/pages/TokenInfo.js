import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {REWARD_TOKEN_CONTRACT_ADDRESS} from "../constants";
import {useContractRead} from "wagmi";
import abi from "../abi/tokenAbi";
import {formatUnits} from "ethers/lib/utils";

const TokenInfo = () => {

    const name = useContractRead({address: REWARD_TOKEN_CONTRACT_ADDRESS, abi: abi, functionName: "name"}).data;
    const symbol = useContractRead({address: REWARD_TOKEN_CONTRACT_ADDRESS, abi: abi, functionName: "symbol"}).data;
    const decimals = useContractRead({address: REWARD_TOKEN_CONTRACT_ADDRESS, abi: abi, functionName: "decimals"}).data;
    const totalSupply = formatUnits(useContractRead({
        address: REWARD_TOKEN_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "totalSupply"
    }).data ?? 0);

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow key="token-address">
                        <TableCell align="right" component="th" scope="row">Token address:</TableCell>
                        <TableCell align="left">{REWARD_TOKEN_CONTRACT_ADDRESS}</TableCell>
                    </TableRow>
                    <TableRow key="token-name">
                        <TableCell align="right" component="th" scope="row">Name:</TableCell>
                        <TableCell align="left">{name}</TableCell>
                    </TableRow>
                    <TableRow key="token-symbol">
                        <TableCell align="right" component="th" scope="row">Symbol:</TableCell>
                        <TableCell align="left">{symbol}</TableCell>
                    </TableRow>
                    <TableRow key="token-decimals">
                        <TableCell align="right" component="th" scope="row">Decimals:</TableCell>
                        <TableCell align="left">{decimals}</TableCell>
                    </TableRow>
                    <TableRow key="token-total-supply">
                        <TableCell align="right" component="th" scope="row">Total supply:</TableCell>
                        <TableCell align="left">{totalSupply}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TokenInfo;
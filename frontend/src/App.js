import {ThemeProvider} from '@mui/material/styles';
import {Box, CssBaseline, StyledEngineProvider} from '@mui/material';
import {HashRouter} from "react-router-dom";
import AppTheme from "./themes/AppTheme";
import LeftNavbar from "./components/LeftNavbar";
import AppFooter from "./components/AppFooter";
import AppRoutes from "./routes/AppRoutes";
import AppHeader from "./components/AppHeader";
import {Web3Modal} from "@web3modal/react";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {bscTestnet, hardhat} from 'wagmi/chains'
import {EthereumClient, w3mConnectors, w3mProvider} from "@web3modal/ethereum";

const chains = [bscTestnet, hardhat]
const projectId = '8ae42c74efe257f44de9ff5631a9245e';

const {provider} = configureChains(chains, [w3mProvider({projectId})]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({projectId, version: 1, chains}),
    provider
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {

    return (
        <> <WagmiConfig client={wagmiClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={AppTheme}>
                    <HashRouter>
                        <Box sx={{display: 'flex', minHeight: '100vh'}}>
                            <CssBaseline/>
                            <Box component="nav"
                                 sx={{width: {sm: '15vw'}}}>
                                <LeftNavbar/>
                            </Box>
                            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                <AppHeader/>
                                <Box component="main" sx={{flex: 1, py: 6, px: 4}}>
                                    <AppRoutes/>
                                </Box>
                                <Box component="footer" sx={{p: 2}}>
                                    <AppFooter/>
                                </Box>
                            </Box>
                        </Box>
                    </HashRouter>
                </ThemeProvider>
            </StyledEngineProvider>
        </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
        </>
    );
};

export default App;
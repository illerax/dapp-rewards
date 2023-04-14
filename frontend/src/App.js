import {ThemeProvider} from '@mui/material/styles';
import {Backdrop, Box, CircularProgress, CssBaseline, StyledEngineProvider} from '@mui/material';
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
import {WALLET_CONNECT_CLOUD_PROJECT_ID} from "./constants";
import AppModal from "./components/AppModal";
import {useSelector} from "react-redux";

const chains = [bscTestnet, hardhat]
const projectId = WALLET_CONNECT_CLOUD_PROJECT_ID;

const {provider} = configureChains(chains, [w3mProvider({projectId})]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({projectId, version: 1, chains}),
    provider
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {

    const isBackdropOpened = useSelector((state) => state.backdrop.isOpened);

    return (
        <> <WagmiConfig client={wagmiClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={AppTheme}>
                    <AppModal/>
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={isBackdropOpened}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
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
import {ThemeProvider} from '@mui/material/styles';
import {Box, CssBaseline, StyledEngineProvider} from '@mui/material';
import {HashRouter} from "react-router-dom";
import AppTheme from "./themes/AppTheme";
import LeftNavbar from "./components/LeftNavbar";
import AppFooter from "./components/AppFooter";
import AppRoutes from "./routes/AppRoutes";
import AppHeader from "./components/AppHeader";

const App = () => {

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={AppTheme}>
                <HashRouter>
                    <Box sx={{display: 'flex', minHeight: '100vh'}}>
                        <CssBaseline/>
                        <Box component="nav"
                             sx={{width: {sm: '10vw'}}}>
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
    );
};

export default App;
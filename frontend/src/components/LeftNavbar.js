import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

const categories = [
    {
        id: 'Pages',
        children: [
            {
                id: 'Home',
                icon: <HomeIcon />,
                to: '/',
            },
            { id: 'About', icon: <InfoIcon />, to: '/about' },
        ],
    }
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(0, 0, 0, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

const LeftNavbar = () => {
    return (
        <Drawer variant="permanent">
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22}}>
                    Rewards
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id}>
                        <ListItem sx={{py: 2, px: 3}}>
                            <ListItemText>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, active, to}) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton selected={active}
                                                component={Link}
                                                to={to}
                                                sx={item}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{mt: 2}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}

export default LeftNavbar;
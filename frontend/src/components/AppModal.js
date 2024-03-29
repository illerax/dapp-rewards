import React from 'react';
import {Box, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {close} from '../store/modalSlice'

const AppModal = () => {

    const isOpened = useSelector((state) => state.modal.isOpened);
    const text = useSelector((state) => state.modal.text);
    const dispatch = useDispatch();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={isOpened}
            onClose={() => dispatch(close())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6">
                    {text}
                </Typography>
            </Box>
        </Modal>
    )
}

export default AppModal;
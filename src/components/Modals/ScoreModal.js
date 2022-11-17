// @ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ReactModal from 'react-modal';
import './scoreModal.css'

export const ScorModal = (props) => {
    const { scoreMap } = props.game;
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => props.setIsScore(false);

    const clients = props.game.clients;
    const createData = () => {
        return Object.values(clients).map(c => {
            const { playerNum, nickname } = c;
            return <tr key={playerNum}>
                <td>{nickname + ":"}</td>
                <td>{scoreMap[playerNum]}</td>
            </tr>
        })
    }
    const data = createData();

    return (
            <ReactModal className="scoreModal" isOpen={props.isScore} onRequestClose={() => props.setIsScore(false)}>
                <button className='Xbutton' onClick={() => props.setIsScore(false)}>X</button>
                <h2>Score:</h2>
                <table>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </ReactModal>
    );
}

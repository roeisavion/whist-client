import { useState } from 'react';
import './Bets.css'
import { sendSuitBet, sendPass } from './suitBetsFunctions.js'
import './smallButton.css'
import { NumberInput } from './NumberInput';
import { Input, InputLabel, MenuItem, Select } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ff0000',
        }
    },
    typography: {
        fontFamily: 'Fuzzy Bubbles'
    }
});


export const SuitBets = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    const [suitBetNum, setSuitBetNum] = useState(0)
    const [betSuit, setBetSuit] = useState("H")
    const handelNumChange = (event) => {
        setSuitBetNum(event.target.value)
    }
    const handelSuitChange = (event) => {
        setBetSuit(event.target.value)
    }

    return <ThemeProvider theme={theme}><div className="bets">
        <div className='upperWrapper'>
            {/* <input type="number" placeholder="write your bet" id="betNum" name="betNum" min="3" max="13" onChange={handelNumChange} /> */}
            {/* <Input 
            type="number"
            // placeholder="write your bet" 
            id="betNum" 
            name="betNum" 
            min="3" 
            max="13" 
            onChange={handelNumChange} /> */}
            <NumberInput min={3} max={13} setMyBetNum={setSuitBetNum} myBetNum={suitBetNum} />
            {/* <select id="suit" onChange={handelSuitChange}>
                <option className='redFont' value="H">Heart ❤</option>
                <option value="S">Spade ♠</option>
                <option className='redFont' value="D">Diamond ♦</option>
                <option value="C">Club ♣</option>
            </select> */}

            {/* <InputLabel>Age</InputLabel> */}
            <Select
                size='small'
                value={betSuit}
                // label="Suit"
                onChange={handelSuitChange}
                // inputProps={{
                //     MenuProps: {
                //         MenuListProps: {
                //             sx: {
                //                 backgroundColor: 'red'
                //             }
                //         }
                //     }
                // }}
                sx={{ backgroundColor: 'white' }}>
                <MenuItem value={"H"} color="red">Heart ❤</MenuItem>
                <MenuItem value={"S"}>Spade ♠</MenuItem>
                <MenuItem classes={'redFont'} value={"D"}>Diamond ♦</MenuItem>
                <MenuItem value={"C"}>Club ♣</MenuItem>
            </Select>
            <button className='smallButton' onClick={() => sendSuitBet(client, clientId, suitBetNum, betSuit, props.suitBet)} disabled={!props.isMyTurn}>submit</button>
        </div>
        <div>
            <button className='smallButton' onClick={() => sendPass(client, clientId)} disabled={!props.isMyTurn}>Pass</button>
        </div>
    </div>
    </ThemeProvider>
}


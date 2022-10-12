import './WaitingRoom.css'

export const WaitingRoom = (props) => {
    const clients = props.game.clients;
    const createData = () =>{
        return Object.values(clients).map(c => {
            const {playerNum,nickname} = c
            return <tr>
                <td>{fullName[playerNum] + ":"}</td>
                <td>{nickname}</td>
            </tr>
        })
    }
    
    const data = createData();
    return <div className="waitingRoom">
        <h3>players in room :</h3>
        <table>
            <tbody>
                {data}
            </tbody>
        </table>
        <p>GameID: {props.game.id}</p>
    </div>
}

const fullName = {
    P1 : "player 1",
    P2 : "player 2",
    P3 : "player 3",
    P4 : "player 4"
}
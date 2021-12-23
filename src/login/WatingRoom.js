import './waitingRoom.css'

export const WaitingRoom = (props) => {
    const clients = props.game.clients;
    const createData = () =>{
        return Object.values(clients).map(c => {
            const {playerNum,nickname} = c
            return <tr>
                <td>{playerNum + ":"}</td>
                <td>{nickname}</td>
            </tr>
        })
    }
    
    const data = createData();
    console.log("aaa")
    return <div className="waitingRoom">
        <h3>players in room:</h3>
        <table>
            <tbody>
                {data}
            </tbody>
        </table>
    </div>
}
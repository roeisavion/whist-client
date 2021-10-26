import './button.css'

export const joinButton = (props) => {
    return <button onClick={props.onClick} className='button'>Join Game</button>
}

export const CreateButton = (props) => {
    return <button onClick={props.onClick} className='button'>Create Game</button>
}

export const GameIdInput = (props) => {
    return <input className={props.className} placeholder="enter gameId"></input>
}

export const NicknameInput = (props) => {
    return <input className={props.className} placeholder="enter nickname"></input>
}
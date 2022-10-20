import { Hand } from "../Hand/Hand"
import { Login } from "../login/login"
import "./LoginPage.css"

export const LoginPage = (props) => {
    return <div className="LoginPage">
        <div className="welcomeAndLogo">
        <h1>Whist</h1>
        <Hand arrayOfCards={["AH","AS","AD","AC"]} 
        className="LogoCards" 
        cardClassName='logoCard' 
        shouldDisable={true} />
        </div>
        <Login client={props.client}
            clientId={props.clientId}
            inGame={props.inGame}
            game={props.game}
            gameId={props.gameId} />
    </div>
}
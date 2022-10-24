// import useCopy from 'use-copy';
import './GameCreatedModal.css'
import { Button } from "@mui/material"

export const GameCreatedModal = (props) => {
    const setOpenGameCreatedModal = props.setisGameCreatedModal;
    return <div>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn"><button  
                onClick={()=> setOpenGameCreatedModal(false)}>X
                </button>
                </div>
                <div className="title"></div>
                <div className="body">
                    <div className="text-right cross"> <i className="fa fa-times"></i> </div>
                    <div className="card-body text-center"> <img src="https://img.icons8.com/stickers/100/000000/cards.png" />
                        <h4>GAME CREATED SUCCSSFULY</h4>
                        <h3>GameId: {props.gameId}</h3>
                    </div>
                    <div className="footer">
                        <button onClick={()=> setOpenGameCreatedModal(false)} className="btn btn-out btn-square continue">CONTINUE</button>
                        <button className="btn btn-out btn-square continue">COPY GAME ID</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


// const copyGameId = (gameId) => {
//     const [copied, copy, setCopied] = useCopy(gameId);
// }



// <div class="col-md-6"> <button type="button" class="btn btn-lg btn-warning" data-toggle="modal" data-target="#myModal">Open Congratulations card Modal</button>
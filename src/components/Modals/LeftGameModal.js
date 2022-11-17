// import useCopy from 'use-copy';
import './LeftGameModal.css'
// import { Button } from "@mui/material"

export const LeftGameModal = (props) => {
    const closeModal = props.setIsLeftGameModal;
    return <div>
        <div class="smallModalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}>X</button>
            </div>
            <div class="title"></div>
            <div class="body">
                <div class="text-right cross"> <i class="fa fa-times"></i> </div>
                <div class="card-body text-center">
                    <h4>{props.nickname} has left the game</h4>
                </div>
                <div class="footer">
                    <button onClick={() => closeModal(false)} class="btn btn-out btn-square continue">CLOSE</button>
                </div>
            </div>
        </div>
    </div>
}


// const copyGameId = (gameId) => {
//     const [copied, copy, setCopied] = useCopy(gameId);
// }



// <div class="col-md-6"> <button type="button" class="btn btn-lg btn-warning" data-toggle="modal" data-target="#myModal">Open Congratulations card Modal</button>
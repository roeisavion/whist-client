import './login.css'
// import './nick.css'


export const NicknameInput = (props) => {
    // const [nickname, setNickname] = useState("")
    // const handelNicknameChange = (event) => {
    //     setNickname(event.target.value)
    // }

    return <div className="nicknameBox">
            <input className="nicknameInput" placeholder="enter nickname" onChange={props.handelNicknameChange}></input>
        </div>
  //   return <p>
  //   <span class="input">
  //     <input type="text" placeholder="Gradient border focus fun"/>
  //     <span></span> 
  //   </span>
  // </p>
}



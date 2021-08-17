import './Bets.css'

export const Bets = (props) => {
    return <div className = "bets">
        <div>
            <input type='number' placeholder="write your bet"></input>
            <select>
                <option value="H">H</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="S">S</option>
            </select>
            <button>submit</button>
        </div>
        <div>
            <button>Pass</button>
        </div>
    </div>
}
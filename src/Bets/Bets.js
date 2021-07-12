import './Bets.css'

export const Bets = (props) => {
    return <div className = "bets">
        <div>
            <input placeholder="write your bet"></input>
            <select>
                <option value="H">H</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="S">S</option>
            </select>
        </div>
        <div>
            <button>Pass</button>
        </div>
    </div>
}
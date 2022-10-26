import { useEffect, useState } from "react"

export const NumberInput = (props) => {
    const {min,max,setMyBetNum,myBetNum} = props;

    useEffect(()=>{
        setMyBetNum(min);
    },[])

    const decrement = () => {
        if (myBetNum -1 >= min){
            setMyBetNum(myBetNum-1);
        }
    }

    const increment = () => {
        if (myBetNum +1 <= max){
            setMyBetNum(myBetNum+1);
        }
    }
    
      return (
        <div className="input-number" >
          <button type="button" onClick={() => decrement()}>&minus;</button>
          <span>{props.myBetNum}</span>
          <button type="button" onClick={() => increment()}>&#43;</button>     
        </div>
      )
  }
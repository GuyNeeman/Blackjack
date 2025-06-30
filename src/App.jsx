import './App.css'
import Table from "./Comp/Table.jsx";
import Blackjack from "./Comp/CardsGenerator.jsx";
import {useState} from "react";
import GameStart from "./Comp/GameStart.jsx";

function App() {
    const [money, setMoney] = useState(1000);
    const [chips, setChips] = useState([]);
    const [chose, setChose] = useState(true);
    const [gameover, setGameover] = useState(false);
    const [start, setStart] = useState(true);
    const [startScreen, setStartScreen] = useState(true);

  return (
      <>
          <Blackjack chips={chips} setChips={setChips} money={money} setMoney={setMoney} gameover={gameover} setGameover={setGameover} setChose={setChose} start={start} setStart={setStart} chose={chose} setStartScreen={setStartScreen} startScreen={startScreen}/>
      </>
  )
}

export default App

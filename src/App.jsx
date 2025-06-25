import './App.css'
import Table from "./Comp/Table.jsx";
import Blackjack from "./Comp/CardsGenerator.jsx";
import {useState} from "react";

function App() {
    const [money, setMoney] = useState(0);
    const [chips, setChips] = useState([]);
    const [chose, setChose] = useState(true);
    const [gameover, setGameover] = useState(false);

  return (
      <>
          <Blackjack money={money} setMoney={setMoney} gameover={gameover} setGameover={setGameover}/>
          <Table chips={chips} setChips={setChips} chose={chose}/>
      </>
  )
}

export default App

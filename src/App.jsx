import './App.css'
import Table from "./Comp/Table.jsx";
import Blackjack from "./Comp/CardsGenerator.jsx";
import {useState} from "react";

function App() {

    const [money, setMoney] = useState(0);
  return (
    <>
        <Blackjack money={money} setMoney={setMoney}/>
      <Table></Table>
    </>
  )
}

export default App

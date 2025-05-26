import { useState } from "react";

export default function Blackjack() {
    const [currentnumber, setCurrentnumber] = useState("");
    const [currentsymbol, setCurrentsymbol] = useState("");
    const [currentcard, setCurrentcard] = useState("");
    const [cardvalue, setCardvalue] = useState(0);
    const [cards, setCards] = useState([]);

    function getCards() {
        const number = Math.floor(Math.random() * 13) + 2;
        const symbolNumber = Math.floor(Math.random() * 4) + 1;
        let symbol, finalNumber, cardValue;

        switch (number) {
            case 11:
                finalNumber = "J";
                cardValue = 10;
                break;
            case 12:
                finalNumber = "Q";
                cardValue = 10;
                break;
            case 13:
                finalNumber = "K";
                cardValue = 10;
                break;
            case 14:
                finalNumber = "A";
                cardValue = 11;
                break;
            default:
                finalNumber = number;
                cardValue = number;
        }

        switch (symbolNumber) {
            case 1:
                symbol = "♠";
                break;
            case 2:
                symbol = "♥";
                break;
            case 3:
                symbol = "♦";
                break;
            case 4:
                symbol = "♣";
                break;
        }

        const newCard = `${finalNumber}${symbol}`;

        if (cards.includes(newCard)) {
            console.log("newCard is in the list!");
            getCards();
        } else {
        setCurrentnumber(finalNumber);
        setCardvalue(cardValue);
        setCurrentsymbol(symbol);
        setCurrentcard(newCard);
        setCards(prevCards => [...prevCards, newCard]);
     }
    }

    return (
        <div>
            <p>{currentcard}</p>
            <p>{cardvalue}</p>
            <button onClick={getCards}>Draw Card</button>

            <ul>
                {cards.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
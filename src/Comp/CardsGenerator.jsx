import { useState } from "react";
import Card from "./Card.jsx";
import '../Styles/CardsGen.css';
import GameStart from "./GameStart.jsx";

export default function Blackjack({ money, setMoney, gameover, setGameover, setChose, start, setStart, setChips, chips, chose, startScreen, setStartScreen }) {
    const [restarts, setRestart] = useState(false);
    const [cardState, setCardState] = useState({
        currentNumber: "",
        currentSymbol: "",
        currentCard: "",
        cardValue: 0,
    });

    const [cards, setCards] = useState([]);
    const [user, setUser] = useState({
        cards: [],
        cardsValue: 0,
        disabled: true,
        stand: true,
    });
    const [dealer, setDealer] = useState({
        cards: [],
        cardsValue: 0,
    });

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

        if (cards.some(c => c.currentCard === newCard)) {
            if (cards.length !== 52) {
                return getCards();
            }
            return null;
        } else {
            const card = {
                currentNumber: finalNumber,
                currentSymbol: symbol,
                currentCard: newCard,
                cardValue: cardValue,
            };

            setCardState(card);
            setCards(prevCards => [...prevCards, card]);

            return card;
        }
    }

    function setPerson(person, card, valueToAdd) {
        if (person === "user") {
            setUser(prevUser => ({
                ...prevUser,
                cards: [...prevUser.cards, card],
                cardsValue: prevUser.cardsValue + valueToAdd,
            }));
        } else if (person === "dealer") {
            setDealer(prevDealer => ({
                ...prevDealer,
                cards: [...prevDealer.cards, card],
                cardsValue: prevDealer.cardsValue + valueToAdd,
            }));
        }
    }

    function handleUserDraw() {
        const card = getCards();
        if (card) {
            const valueToAdd = (card.currentNumber === "A" && user.cardsValue + card.cardValue > 21) ? 1 : card.cardValue;
            setPerson("user", card, valueToAdd);
            checkWinUser(user.cardsValue + valueToAdd);
        }
    }

    function handleDealerDraw() {
        const card = getCards();
        if (card) {
            const valueToAdd = (card.currentNumber === "A" && dealer.cardsValue + card.cardValue > 21) ? 1 : card.cardValue;
            setPerson("dealer", card, valueToAdd);
        }
    }

    const startGame = () => {
        handleUserDraw();
        handleDealerDraw();
        handleUserDraw();
        setUser(prev => ({
            ...prev,
            disabled: false,
            stand: false
        }));
        setRestart(false);
    };

    async function restart() {
        setUser(prevUser => ({
            ...prevUser,
            cards: [],
            cardsValue: 0,
            disabled: true,
            stand: true,
        }));
        setDealer(prevDealer => ({
            ...prevDealer,
            cards: [],
            cardsValue: 0,
        }));
        setCards([]);
        setGameover(false);
        setRestart(true);
    }

    async function stand() {
        setUser(prevUser => ({
            ...prevUser,
            disabled: true,
            stand: true,
        }));

        await dealer16();
    }

    async function dealer16() {
        let currentValue = dealer.cardsValue;

        while (currentValue < 17) {
            const card = getCards();
            if (card) {
                let valueToAdd = (card.currentNumber === "A" && currentValue + card.cardValue > 21) ? 1 : card.cardValue;

                currentValue += valueToAdd;

                setDealer(prevDealer => ({
                    cards: [...prevDealer.cards, card],
                    cardsValue: currentValue,
                }));

                await new Promise(res => setTimeout(res, 500));
            } else {
                break;
            }
        }

        setGameover(true);
    }

    function checkWinUser(value) {
        if (value > 21) {
            setUser(prevUser => ({
                ...prevUser,
                disabled: true,
                stand: true,
            }));
            setGameover(true);
        }
    }

    const totalValue = chips.reduce((sum, val) => sum + val, 0);

    return (
        <>
            <GameStart start={start} setStart={setStart} startGame={startGame} gameover={gameover} restart={restart} user={user} setChips={setChips} chips={chips} chose={chose} setChose={setChose} startScreen={startScreen} setStartScreen={setStartScreen} money={money}/>
        <div>
            {!start && (
                <>
                    <div className="bank">
                        Bank: <span>${money}</span>
                    </div>
                    <div className="totale">
                        Wager: <span>${totalValueg}</span>
                    </div>
                    {restarts && (
                        <button onClick={startGame}>Start</button>
                    )}
                    <div>
                        <h3>Dealer Cards:</h3>
                        <div className="carddealer">
                            {dealer.cards.map((card, index) => (
                                <Card key={index} value={card.currentNumber} suit={card.currentSymbol}/>
                            ))}
                        </div>
                        <p>Wert: {dealer.cardsValue}</p>
                    </div>

                    <div>
                        <h3>User Cards:</h3>
                        <div className="carduser">
                            {user.cards.map((card, index) => (
                                <Card key={index} value={card.currentNumber} suit={card.currentSymbol}/>
                            ))}
                        </div>
                        <p>Wert: {user.cardsValue}</p>
                    </div>

                    <button onClick={handleUserDraw} disabled={user.disabled}>Hit</button>
                    <button onClick={stand} disabled={user.stand}>Stand</button>
                </>
            )}
        </div>
        </>
    );
}

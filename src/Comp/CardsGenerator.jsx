import { useState } from "react";
import Card from "./Card.jsx";
import '../Styles/CardsGen.css';
import GameStart from "./GameStart.jsx";

export default function Blackjack({ money, setMoney, gameover, setGameover, setChose, start, setStart, setChips, chips, chose, startScreen, setStartScreen }) {
    const [restarts, setRestart] = useState(false);
    const [message, setMessage] = useState("Unknown");
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

    function adjustForAces(cards, total) {
        let aceCount = cards.filter(card => card.currentNumber === "A").length;

        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount--;
        }

        return total;
    }

    function setPerson(person, card, valueToAdd) {
        if (person === "user") {
            setUser(prevUser => {
                const newCards = [...prevUser.cards, card];
                let newValue = prevUser.cardsValue + valueToAdd;
                newValue = adjustForAces(newCards, newValue);

                return {
                    ...prevUser,
                    cards: newCards,
                    cardsValue: newValue,
                };
            });
        } else if (person === "dealer") {
            setDealer(prevDealer => {
                const newCards = [...prevDealer.cards, card];
                let newValue = prevDealer.cardsValue + valueToAdd;
                newValue = adjustForAces(newCards, newValue);

                return {
                    ...prevDealer,
                    cards: newCards,
                    cardsValue: newValue,
                };
            });
        }
    }

    function handleUserDraw() {
        let card = null;
        while (!card) {
            card = getCards();
        }

        if (card) {
            const valueToAdd = card.cardValue;
            setPerson("user", card, valueToAdd);
            const simulatedValue = adjustForAces([...user.cards, card], user.cardsValue + valueToAdd);
            checkLoseUser(simulatedValue);
        }
    }

    function handleDealerDraw() {
        let card = null;
        while (!card) {
            card = getCards();
        }

        if (card) {
            const valueToAdd = card.cardValue;
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
        setChose(false);
        setChips([]);
        setStart(true);
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
        let simulatedDealerCards = [...dealer.cards];
        let currentValue = dealer.cardsValue;

        while (currentValue < 17) {
            const card = getCards();
            if (!card) break;

            simulatedDealerCards.push(card);
            currentValue += card.cardValue;
            currentValue = adjustForAces(simulatedDealerCards, currentValue);

            setDealer({
                cards: [...simulatedDealerCards],
                cardsValue: currentValue,
            });

            await new Promise(res => setTimeout(res, 500));
        }

        const correctedUserValue = adjustForAces(user.cards, user.cardsValue);

        checkLoseUser(correctedUserValue);
        checkWinUser(correctedUserValue, currentValue);
    }


    function checkLoseUser(userValue) {
        if (userValue > 21) {
            setUser(prevUser => ({
                ...prevUser,
                disabled: true,
                stand: true,
            }));
            setMessage("You busted! Dealer wins.");
            setGameover(true);
        }
    }

    function checkWinUser(userValue, dealerValue) {
        if (dealerValue > 21 && userValue <= 21) {
            setMessage("Dealer busted! You win!");
            setMoney(money + totalValue * 2);
            setGameover(true);
        } else if (userValue > dealerValue && userValue <= 21) {
            setMessage("You win!");
            setMoney(money + totalValue * 2);
            setGameover(true);
        } else if (dealerValue === userValue) {
            setMessage("It's a tie!");
            setGameover(true);
        } else {
            setMessage("Dealer wins.");
            setGameover(true);
        }
    }

    const totalValue = chips.reduce((sum, val) => sum + val, 0);

    return (
        <>
            <GameStart
                start={start}
                setStart={setStart}
                startGame={startGame}
                gameover={gameover}
                restart={restart}
                user={user}
                setChips={setChips}
                chips={chips}
                chose={chose}
                setChose={setChose}
                startScreen={startScreen}
                setStartScreen={setStartScreen}
                money={money}
                setMoney={setMoney}
                message={message}
            />
            <div>
                {!start && (
                    <>
                        <div className="bank">
                            Bank: <span>${money}</span>
                        </div>
                        <div className="totale">
                            Wager: <span>${totalValue}</span>
                        </div>
                        <div>
                            <h3>Dealer Cards:</h3>
                            <div className="carddealer">
                                {dealer.cards.map((card, index) => (
                                    <Card key={index} value={card.currentNumber} suit={card.currentSymbol} />
                                ))}
                            </div>
                            <p>Wert: {dealer.cardsValue}</p>
                        </div>

                        <div>
                            <h3>User Cards:</h3>
                            <div className="carduser">
                                {user.cards.map((card, index) => (
                                    <Card key={index} value={card.currentNumber} suit={card.currentSymbol} />
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

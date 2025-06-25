import { useState } from "react";

export default function Blackjack({money, setMoney, gameover, setGameover}) {
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

        if (cards.includes(newCard)) {
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
            setCards(prevCards => [...prevCards, newCard]);

            return card;
        }
    }

    function setPerson(person, newCard, cardValue) {
        if (person === "user") {
            setUser(prevUser => ({
                cards: [...prevUser.cards, newCard],
                cardsValue: prevUser.cardsValue + cardValue,
            }));
        } else if (person === "dealer") {
            setDealer(prevDealer => ({
                cards: [...prevDealer.cards, newCard],
                cardsValue: prevDealer.cardsValue + cardValue,
            }));
        }
    }

    function handleUserDraw() {
        const card = getCards();
        if (card) {
            if (card.currentNumber === "A" && user.cardsValue + card.cardValue > 21) {
                setPerson("user", card.currentCard, card.cardValue-10);
            } else {
            setPerson("user", card.currentCard, card.cardValue);
            }
        }
        checkWinUser(card.cardValue+user.cardsValue);
    }

    function handleDealerDraw() {
        const card = getCards();
        if (card) {
            if (card.currentNumber === "A" && dealer.cardsValue + card.cardValue > 21){
                setPerson("dealer", card.currentCard, card.cardValue-10);
            } else {
            setPerson("dealer", card.currentCard, card.cardValue);
            }
        }
    }

    const startGame = () => {
        handleUserDraw()
        handleDealerDraw()
        handleUserDraw()
    }

    function restart() {
        setUser(prevUser => ({
            ...prevUser,
            cards: [],
            cardsValue: 0,
        }));
        setDealer(prevDealer => ({
            ...prevDealer,
            cards: [],
            cardsValue: 0,
        }));
        setGameover(false)
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
                let valueToAdd = card.cardValue;
                if (card.currentNumber === "A" && currentValue + card.cardValue > 21) {
                    valueToAdd = 1;
                }

                currentValue += valueToAdd;

                setDealer(prevDealer => ({
                    cards: [...prevDealer.cards, card.currentCard],
                    cardsValue: prevDealer.cardsValue + valueToAdd,
                }));

                await new Promise(res => setTimeout(res, 500)); // simulate delay
            } else {
                break;
            }
        }

        setGameover(true);
    }



    function checkWinUser(value) {
        if(value > 21) {
            setUser(prevUser => ({
                ...prevUser,
                disabled: true,
                stand: true,
            }));
            setGameover(true)
        }
    }

    return (
        <div>
            {gameover && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 999
                }}>
                    <div style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "2rem",
                        borderRadius: "1rem",
                        textAlign: "center",
                        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                        maxWidth: "300px"
                    }}>
                        <h2>Game Over!</h2>
                        <p>Your score: {user.cardsValue}</p>
                        <button onClick={restart} style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1rem",
                            marginTop: "1rem",
                            cursor: "pointer"
                        }}>Restart</button>
                    </div>
                </div>
            )}
            <button onClick={startGame}>Start</button>

            <div>
                <h3>User Cards:</h3>
                {user.cards.map((card, index) => (
                    <p key={index}>{card}</p>
                ))}
                <p>Wert: {user.cardsValue}</p>
            </div>

            <div>
                <h3>Dealer Cards:</h3>
                {dealer.cards.map((card, index) => (
                    <p key={index}>{card}</p>
                ))}
                <p>Wert: {dealer.cardsValue}</p>
            </div>

            <button onClick={handleUserDraw} disabled={user.disabled}>Hit</button>
            <button onClick={stand} disabled={user.stand}>Stand</button>
        </div>
    );
}
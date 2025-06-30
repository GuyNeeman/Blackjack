import card from '../assets/cards.png'
import Table from "./Table.jsx";

export default function GameStart({ start, setStart, startGame, gameover, user, restart, chips, setChips, chose, setChose, startScreen, setStartScreen, money }) {

    function setStartfunc() {
        setChose(false);
        setStartScreen(false);
    }

    return (
        <div>
            {startScreen && (
                <>
                    <h1>Blackjack</h1>
                    <img src={card}/>
                    <br/>
                    <button
                        style={{
                            width: '150px',
                            background: 'blue',
                            borderRadius: '20px',
                            position: 'relative',
                            padding: '20px',
                            margin: '50px auto',
                        }} onClick={setStartfunc}
                    >
                        Play
                    </button>

                    <p>By clicking play you're agreeing to our Terms Of Service.</p>
                    <p>© Guy Neeman</p>
                </>
            )}
                <>
                    <Table chips={chips} setChips={setChips} chose={chose} startGame={startGame} setStart={setStart} setChose={setChose} money={money}/>
                </>
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
                        }}>Restart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
import '../Styles/Table.css';
import Chip from './Chip.jsx';

export default function Table({ chips, setChips, chose, startGame, setStart, setChose, money }) {
    const handleChipSelect = (value) => {
        if(totalValue + value <=     money) {
        setChips(prevChips => [...prevChips, value]);
    }};

    const handleChipRemove = (value) => {
        const index = [...chips].reverse().findIndex(chip => chip === value);
        if (index !== -1) {
            const realIndex = chips.length - 1 - index;
            const newChips = [...chips];
            newChips.splice(realIndex, 1);
            setChips(newChips);
        }
    };

    const totalValue = chips.reduce((sum, val) => sum + val, 0);

    const chipValues = [1, 5, 25, 50, 100, 500];

    const chipStacks = chipValues.reduce((acc, val) => {
        acc[val] = chips.filter(c => c === val);
        return acc;
    }, {});

    function deal() {
        setStart(false);
        setChose(true);
        startGame();
    }

    return (
        <>
            {!chose && (
                <>
                    <div className="bank">
                        Bank: <span>${money}</span>
                    </div>

                    <div className="total">
                        ${totalValue}
                    </div>

                    <div className="deal">
                        <button onClick={deal}>DEAL</button>
                    </div>

                    <div className="chips">
                        {chipValues.map(value => (
                            <Chip key={value} value={value} onSelect={handleChipSelect} />
                        ))}
                    </div>

                    <div className="chip-stack">
                        {chipValues.map(value => (
                            chipStacks[value].length > 0 && (
                                <div
                                    key={value}
                                    className="chip-stack-item"
                                    onClick={() => handleChipRemove(value)}
                                >
                                    {chipStacks[value].map((_, i) => (
                                        <div
                                            key={i}
                                            className="stacked-chip"
                                            style={{ bottom: `${i * 5}px` }}
                                        >
                                            <Chip value={value} />
                                        </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

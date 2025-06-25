import './Table.css';
import Chip from './Chip.jsx';

export default function Table({ chips, setChips, chose }) {
    const handleChipSelect = (value) => {
        setChips(prevChips => [...prevChips, value]);
    };

    const totalValue = chips.reduce((sum, val) => sum + val, 0);

    return (
        <>
            {chose && (
                <div className="chips">
                    <Chip value={1} onSelect={handleChipSelect} />
                    <Chip value={5} onSelect={handleChipSelect} />
                    <Chip value={25} onSelect={handleChipSelect} />
                    <Chip value={50} onSelect={handleChipSelect} />
                    <Chip value={100} onSelect={handleChipSelect} />
                    <Chip value={500} onSelect={handleChipSelect} />
                </div>
            )}
            <div className="chip-value-display">
                <p>Total: ${totalValue}</p>
            </div>
        </>
    );
}
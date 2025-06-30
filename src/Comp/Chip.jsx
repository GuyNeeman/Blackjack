import one from '../assets/one-chip.png';
import five from '../assets/five-chip.png';
import twentyfive from '../assets/twentyfive-chip.png';
import fifty from '../assets/fiffty-chip.png';
import onehundred from '../assets/onehundred-chip.png';
import fivehundred from '../assets/fivehundred-chip.png';
import '../Styles/Table.css'

export default function Chip({ value, onSelect }) {
    const imageMap = {
        1: one,
        5: five,
        25: twentyfive,
        50: fifty,
        100: onehundred,
        500: fivehundred
    };

    return (
        <div className="chip-wrapper">
            <button onClick={() => onSelect(value)}>
                <img
                    src={imageMap[value]}
                    alt={`Chip ${value}`}
                    className="chip-image"
                />
            </button>
        </div>
    );
}
import './Table.css';
import Chip from './Chip.jsx';
import { useState } from 'react';

export default function Table(chips, addChips) {
    const [selectedChip, setSelectedChip] = useState(null);

    const handleChipSelect = (value) => {
        setSelectedChip(value);
    };

    return (
        <div className="chips">
            <Chip value={1} onSelect={handleChipSelect} />
            <Chip value={5} onSelect={handleChipSelect} />
            <Chip value={25} onSelect={handleChipSelect} />
            <Chip value={50} onSelect={handleChipSelect} />
            <Chip value={100} onSelect={handleChipSelect} />
            <Chip value={500} onSelect={handleChipSelect} />
        </div>
    );
}

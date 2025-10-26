import React from 'react';
import styles from '../Styles/Card.module.css';

export default function Card({ value, suit }) {
    function getColor() {
        return (suit === '♠' || suit === '♣') ? styles.black : styles.red;
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.cardContent} ${getColor()}`}>
                <div className={styles.topLeft}>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.value}>{suit}</div>
                </div>
                <div className={styles.suit}>{suit}</div>
                <div className={styles.bottomRight}>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.value}>{suit}</div>
                </div>
            </div>
        </div>
    );
}

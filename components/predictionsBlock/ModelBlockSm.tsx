import React from 'react'
import styles from './ModelBlockSm.module.css'

interface Prediction {
    digit: number;
    confidence: number;
}

interface ModelData {
    name: string;
    output: Prediction[];
    guess: Prediction;
}

const ModelBlockSm = ({ name, output, guess }: ModelData) => {
    const maxConfidence = Math.max(...output.map(pred => pred.confidence));

    const top3 = [...output]  
        .sort((a, b) => Number(b.confidence) - Number(a.confidence))
        .slice(0, 3);

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.centerX}>
                    <span className={styles.nameText}>{name}</span>
                </div>
                <div className={styles.centerX}>
                    <span className={styles.nameText}>Classifier</span>
                </div>
                <div className={`${styles.centerX} ${styles.topMargin}`}>
                    <span className={styles.guessText}>{guess.digit}</span>

                </div>
                <div className={styles.centerX}>
                    <span className={styles.guessConfText}>{`${(guess.confidence * 100).toFixed(2)}%`}</span>

                </div>
            </div>
            <div className={styles.rightContainer}>
                <span className={styles.rightHeader}>Top 3</span>
                <ul>
                    {top3.map((item, index) => (
                        <li key={index} className={styles.listItem}>
                            <span>{item.digit}</span>
                            <span className={styles.confText}>{`${(item.confidence * 100).toFixed(2)}%`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default ModelBlockSm
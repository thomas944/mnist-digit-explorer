import React from 'react'
import styles from './ModelBlock.module.css'
import { ModelData } from '../MnistPage';

const ModelBlock = ({ name, output, guess }: ModelData) => {
    const maxConfidence = Math.max(...output.map(pred => pred.confidence));

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.nameContainer}>
                    <span className={styles.nameText}>{name}</span>
                    <span className={styles.nameText}>Classifier</span>
                </div>
                <div className={styles.guessContainer}>
                    <span className={styles.guessText}>{guess.digit}</span>
                    <div>
                        <span className={styles.guessConfText}>{`${(guess.confidence * 100).toFixed(2)}%`}</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.headerContainer}>
                    <span className={styles.headerText}>Confidence</span>
                </div>
                <div className={styles.chartContainer}>
                    <div className={styles.barsContainer}>
                        {output.map((item, index) => (
                            <div key={item.digit} className={styles.barColumn}>
                                <div className={styles.barWrapper}>
                                    <div
                                        style={{
                                            height: `${(item.confidence / maxConfidence) * 100}%`,
                                        }}
                                        className={`${styles.bar}${item.digit === guess.digit ? ` ${styles.barHighlight}` : ''}`}
                                    >
                                    </div>
                                </div>
                                <span className="digitLabel">{item.digit}</span>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModelBlock
'use client';

import React from 'react'
import styles from './PredictionsBlock.module.css'
import ModelBlock from './ModelBlock'
import ModelBlockSm from './ModelBlockSm'
import EmptyBlock from './EmptyBlock'
import { usePrediction } from '../helpers/PredictionContext'

const PredictionsBlock = () => {
    const { data, isLoading } = usePrediction();

    return (
        <div className={styles.container}>
            <span className={styles.titleText}>Model Predictions</span>
            {isLoading && (
                <div className={styles.loadingContainer}>
                    <span className={styles.loadingText}>Loading...</span>
                </div>
            )}

            {!isLoading && data && data.length > 0 ? (
                data.map((entry, index) => (
                    <>
                        <div className={styles.modelBlockLgView} key={index}>
                            <ModelBlock
                                name={entry.name}
                                output={entry.output}
                                guess={entry.guess}
                            />
                        </div>
                        <div className={styles.modelBlockSmView} key={index}>
                            <ModelBlockSm 
                                name={entry.name}
                                output={entry.output}
                                guess={entry.guess}
                            />
                        </div>
                    </>

                ))
            ) : (
                !isLoading && <EmptyBlock />
            )}
        </div>
    )
}

export default PredictionsBlock
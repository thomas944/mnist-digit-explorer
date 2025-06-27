'use client';

import React from 'react'
import styles from './PredictionsBlock.module.css'
import { ModelData } from '../MnistPage'
import ModelBlock from './ModelBlock'
import EmptyBlock from './EmptyBlock'
import { usePrediction } from '../helpers/PredictionContext'

const PredictionsBlock = () => {
    const { data } = usePrediction();

    return (
        <div className={styles.container}>
            <span className={styles.titleText}>Model Predictions</span>
             {data && data.length > 0 ? (
                data.map((entry, index) => (
                    <ModelBlock 
                        key={index} 
                        name={entry.name} 
                        output={entry.output} 
                        guess={entry.guess}
                    />
                ))
            ) : (
                <EmptyBlock />
            )}
        </div>
    )
}

export default PredictionsBlock
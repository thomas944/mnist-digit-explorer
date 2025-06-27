'use client';

import React from 'react'
import styles from './PredictionsBlock.module.css'
import ModelBlock from './ModelBlock'
import ModelBlockSm from './ModelBlockSm'
import EmptyBlock from './EmptyBlock'
import { usePrediction } from '../helpers/PredictionContext'

const PredictionsBlock = () => {
    const { data } = usePrediction();

    return (
        <div className={styles.container}>
            <span className={styles.titleText}>Model Predictions</span>
            
            {data && data.length > 0 ? (
                data.map((entry, index) => (
                    <div key={index}>
                        <div className={styles.modelBlockLgView}>
                            <ModelBlock
                                name={entry.name}
                                output={entry.output}
                                guess={entry.guess}
                            />
                        </div>
                        <div className={styles.modelBlockSmView}>
                            <ModelBlockSm 
                                name={entry.name}
                                output={entry.output}
                                guess={entry.guess}
                            />
                        </div>
                    </div>

                ))
            ) : (
                <EmptyBlock />
            )}
        </div>
    )
}

export default PredictionsBlock
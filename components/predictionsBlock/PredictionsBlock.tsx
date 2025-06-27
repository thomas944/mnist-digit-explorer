import React from 'react'
import styles from './PredictionsBlock.module.css'
import { ModelData } from '../MnistPage'
import ModelBlock from './ModelBlock'
import EmptyBlock from './EmptyBlock'

interface PredictionBlockProps {
    data?: ModelData[]
}

const PredictionsBlock = ({ data }: PredictionBlockProps) => {
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
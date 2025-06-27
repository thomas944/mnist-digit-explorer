import React from 'react'
import styles from './SummaryBlock.module.css'
import { useSelectedModel } from '../helpers/useSelectModel'
import { getSummary } from '../helpers/helpers'
import { getLayerStyle } from '../helpers/helpers'

const SummaryBlock = () => {

    const { selectedModel, setSelectedModel } = useSelectedModel();

    const modelStats = getSummary(selectedModel)
    return (
        <div className={styles.container}>
            <span className={styles.titleText}>{`${modelStats.fullName}`}</span>
            <div className={styles.subHeaderContainer}>
                <span className={styles.subHeaderText}>How it works</span>
                <span>{modelStats.description}</span>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.leftContainer}>
                    <span className={styles.leftHeaderText}>Architecture</span>
                    <div className={styles.layersContainer}>
                        {modelStats.layers.map((layer, index) => (
                            <div key={index} className={styles.layerItem}>
                                <div className={styles.layerContent} style={getLayerStyle(layer.name)}>
                                    <span className={styles.layerNameText}>{layer.name}</span>
                                    <span className={styles.layerDimText}>{layer.dimension}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <span className={styles.rightHeaderText}>Performance</span>
                    <ul className={styles.listContainer}>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{`${modelStats.size}MB`}</span>
                            <span className={styles.subText}>Model Size</span>
                        </li>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{modelStats.params}</span>
                            <span className={styles.subText}>Trainable Parameters</span>
                        </li>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{`${modelStats.trainTime}s`}</span>
                            <span className={styles.subText}>Train Time</span>
                        </li>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{`${modelStats.evalTime}s`}</span>
                            <span className={styles.subText}>Eval Time</span>
                        </li>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{`${modelStats.trainAcc}%`}</span>
                            <span className={styles.subText}>Train Accuracy</span>
                        </li>
                        <li className={styles.listElement}>
                            <span className={styles.numText}>{`${modelStats.testAcc}%`}</span>
                            <span className={styles.subText}>Test Accuracy</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SummaryBlock
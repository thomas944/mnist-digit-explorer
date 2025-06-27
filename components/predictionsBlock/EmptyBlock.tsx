import React from 'react'
import styles from './EmptyBlock.module.css'
import { MdOutlineArrowUpward, MdOutlineArrowBack } from "react-icons/md";

const EmptyBlock = () => {
    return (
        <div className={styles.container}>
            <div className={styles.lg}>
                <div className={styles.textContainer}>
                    <MdOutlineArrowBack size={30}/>
                    <span className={styles.textLargeView}> Draw a digit to begin!</span>
                </div>
            </div>
            <div className={styles.sm}>
                <div className={styles.textContainer}>
                    <MdOutlineArrowUpward size={30}/>
                    <span className={styles.textSmallView}> Draw a digit to begin!</span>
                </div>
            </div>
           

        </div>
    )
}

export default EmptyBlock
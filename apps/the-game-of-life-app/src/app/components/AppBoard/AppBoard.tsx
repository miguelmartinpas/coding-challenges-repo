import { GridBoard } from '../TheGameOfLifeBoard/TheGameOfLifeBoard';
import styles from './AppBoard.module.scss';

const baseClassName = 'app-board'

export const AppBoard = () => {
    return <div className={styles[baseClassName]}>
        <GridBoard />
    </div>
}
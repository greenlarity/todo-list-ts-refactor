import { useContext } from 'react';
import { Theme } from '../../App';
import styles from './header.module.scss';


const TodoHeader: React.FC = () => {
    const { toggleTheme } = useContext(Theme);
    // console.log(context);
    return (
        <div className={styles.header}>
            <h1 className={styles['header__title']}>TODO</h1>
            <button onClick={toggleTheme}>Theme</button>
        </div>
    )
};

export default TodoHeader;
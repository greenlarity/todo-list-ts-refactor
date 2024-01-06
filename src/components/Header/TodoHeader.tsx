import { useContext, useState } from 'react';
import { Theme } from '../../App';
import styles from './header.module.scss';
import { motion } from 'framer-motion';


const TodoHeader: React.FC = () => {
    const { toggleTheme } = useContext(Theme);

    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => {
        setIsOn(!isOn);
        toggleTheme();
    }

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };


    // console.log(context);
    return (
        <div className={styles.header}>
            <h1 className={styles['header__title']}>TODO</h1>
            {/* <button onClick={toggleTheme}>Theme</button> */}
            <div
                className={styles.switch}
                data-isOn={isOn}
                onClick={toggleSwitch}
            >
                <motion.div className={styles.handle} layout transition={spring} />
            </div>
        </div>
    )
};

export default TodoHeader;
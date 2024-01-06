import { motion } from "framer-motion";
import styles from './popup.module.scss';

const Popup = ({ showAnimation }: { showAnimation: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            // exit={{ opacity: 0, y: -20, transition: {duration: 0.5 } }}
            className={styles.popup}
        >
            <p>Task added!</p>
        </motion.div>
    );
};

export default Popup;
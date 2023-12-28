import { createContext, useState } from 'react';
import styles from './global.module.scss';
import TodoPage from './pages/Todo';



export const Theme = createContext<{ theme: string; toggleTheme: () => void }>({
    theme: 'dark',
    toggleTheme: () => { }
});

function App() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"))
    }

    console.log()

    return (
        <>
            <Theme.Provider value={{ theme, toggleTheme }}>
                <div className={styles[theme]}>

                    <TodoPage />
                </div>

            </Theme.Provider>

        </>
    )
}

export default App

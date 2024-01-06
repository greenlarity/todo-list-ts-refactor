import React from 'react';
import styles from './filter.module.scss'

interface FilterTaskProps {
    setFilterType: (filterType: string) => void;
}

const FilterTask: React.FC<FilterTaskProps> = ({ setFilterType }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value);
    };
    return (
        <>
            <form className={styles.container}>
                <div className={styles.filter}>
                    <select className={styles.select} onChange={handleFilterChange}>
                        <option value="opened">Opened</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </form>
        </>
    )
}

export default FilterTask
import { useState } from 'react';

type CheckButtonProps = {
    onChange: (isChecked: boolean) => void,
    className?: string
};


const CheckButton: React.FC<CheckButtonProps> = ({ onChange, className }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <div className={className}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </div>
    );
}

export default CheckButton;
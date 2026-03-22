import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    borderRadius?: number;
    className?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, height = 44, borderRadius = 10, ...props }) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={styles.input}
                style={{
                    height,
                    borderRadius
                }}
                {...props}
            />

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}

export default Input
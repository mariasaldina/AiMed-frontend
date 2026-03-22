import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss'

type ButtonVariant = 'submit' | 'ghost' | 'secondary' | 'standard' | 'doctors' | 'input'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant,
    children: ReactNode;
    className?: string
}

const Button = ({ children, variant = 'submit', className = '', ...props }: ButtonProps) => {
    return (
        <button {...props} className={`${styles.button} ${styles[`button--${variant}`]} ${className}`}>
            {children}
        </button>
    )
}

export default Button;
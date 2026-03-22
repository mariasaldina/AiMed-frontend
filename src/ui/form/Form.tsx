import React, { type FormHTMLAttributes } from "react";
import styles from "./Form.module.scss";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    children: React.ReactNode;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    className?: string;
}

const Form: React.FC<FormProps> = ({
    title,
    children,
    onSubmit,
    className = "",
    ...props
}) => {
    return (
        <div className={`${className}`}>
            <form className={styles.form} onSubmit={onSubmit} {...props}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.content}>
                    {children}
                </div>
            </form>
        </div>
    );
};

export default Form;
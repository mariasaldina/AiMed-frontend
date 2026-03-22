import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './ModalForm.module.scss'
import ExitIcon from '@/ui/icons/exitIcon/ExitIcon'
import Form, { type FormProps } from '../form/Form'

export interface ModalFormProps extends FormProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    children,
    ...props
}) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow

        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <Form onClick={e => e.stopPropagation()} {...props} className={styles.form}>
                <button
                    className={styles.exitButton}
                    onClick={onClose}
                    type="button"
                >
                    <ExitIcon />
                </button>
                {children}
            </Form>
        </div>,
        document.body
    )
}

export default ModalForm
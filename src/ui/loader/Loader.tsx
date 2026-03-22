import styles from './Loader.module.scss'

interface LoaderProps {
    size?: number
    thickness?: number
    fullScreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({
    size = 24,
    thickness = 3,
    fullScreen = false
}) => {
    return (
        <div
            className={fullScreen ? styles.fullScreen : styles.wrapper}
        >
            <div
                className={styles.spinner}
                style={{
                    width: size,
                    height: size,
                    borderWidth: thickness
                }}
            />
        </div>
    )
}

export default Loader
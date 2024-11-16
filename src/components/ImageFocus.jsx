import styles from '../css/ImageFocus.module.css'

export default ({ src, onClose }) => {
            
    return (
        <div className={styles.container} onClick={onClose}>
            <img src={src}/>
        </div>
    )
}
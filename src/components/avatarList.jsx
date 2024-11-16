import styles from '../css/AvatarList.module.css'

export default ({ listaAvatares,onClose, onSelectAvatar }) => {
        
    function selectImage(avatar){
        onSelectAvatar(avatar);
        onClose()
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <p>
                        Escolha seu Avatar
                    </p>
                    <div className={styles.closeButton} onClick={onClose}>
                        X
                    </div>
                </div>

                <div className={styles.avataresField}>
                {listaAvatares.map((avatar) => (
                        <img 
                            key={avatar.id} 
                            src={avatar.img} 
                            alt={`Avatar ID: ${avatar.id}`}
                            onClick={()=>{selectImage(avatar)}} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
const Estatistica = () => {
    return (
        <div>
            {/* Conteúdo do componente */}
            <div className={styles.avatarContainer}>
                <div className={styles.focusAvatar}>
                    <img src="https://i.natgeofe.com/k/093c14b4-978e-41f7-b1aa-3aff5d1c608a/gray-wolf-closeup_square.jpg" alt="Avatar" />
                </div>
                <div className={styles.avatarHorizontalList}>
                    <div>
                        <div className={styles.imgContainer}>
                            <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 1" />
                        </div>
                        <div className={styles.imgContainer}>
                            <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 2" />
                        </div>
                    </div>
                    <div style={{ justifyContent: "end" }}>
                        <div className={styles.imgContainer}>
                            <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 3" />
                        </div>
                        <div
                            className={styles.imgContainer}
                            onClick={() => setShowAvatarList(!showAvatarList)}
                            style={{ cursor: "pointer" }}
                        >                                +
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estatistica;

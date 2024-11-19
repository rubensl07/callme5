export default ((props,ref) => {
    const styles = props.styles
    const imgGallery = props.imgGallery
    return(
        <div className={styles.inputFields}>
        <div className={styles.nomeField}>
            <p>Nome</p>
            <div>
                <input type="text" value={props.nome} onChange={(e) => props.setNome(e.target.value)} />
            </div>
        </div>
        <div className={styles.emailField}>
            <p>E-mail</p>
            <div>
                <input type="text" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
            </div>
        </div>
        <div className={styles.nascimentoField}>
            <p>Data de nascimento</p>
            <div>
                <input type="date" value={props.nascimento} onChange={(e) => props.setNascimento(e.target.value)} />
            </div>
        </div>
        <a className={styles.trocarSenhaField} onClick={() => props.navigate('/passwordRecoveryMailSend')}>
            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
            <p>Trocar Senha</p>
        </a>
        <a className={styles.historicoNotasField}>
            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
            <p>Ver histórico de notas</p>
        </a>
    </div>
    )
})

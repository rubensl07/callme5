export default ((props) => {
    const styles = props.styles
    const imgGallery = props.imgGallery
    const email = props.email
    const nome= props.nome
    const nascimento = props.nascimento

    return (  
        <>
            <div className={styles.topContainer}>
                <div className={styles.focusAvatar}>
                    <img src={props.srcFotoPerfil} alt="Avatar" onClick={() => props.setShowFocusImage(true)} />
                </div>
                <div className={styles.sizeField}>
                    <h2>
                        Murilo 
                    </h2>
                    <p>
                    Professor: <span>
                    Leonid
                        </span>
                    </p>
                </div>
                <div className={styles.sizeField}>
                    <h2>
                        CPF
                    </h2>
                    <p>
                    Duração: 260
                    </p>
                </div>
            </div>
            <div className={styles.inputFieldContainer}>
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
                <div className={styles.buttons}>
                    <button onClick={props.handleExclude}>Excluir conta</button>
                    <button onClick={props.handleLogout}>Sair da conta</button>
                    <button onClick={()=>props.handleUpdate(2,{login:email,nome,nascimento,})}>Atualizar informações</button>
                </div>
            </div>
        </>
    )
})
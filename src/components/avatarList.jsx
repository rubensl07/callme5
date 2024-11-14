import styles from '../css/AvatarList.module.css'

export default ({listaAvatares}) => {
    console.log(listaAvatares);
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <p>
                        Escolha seu Avatar
                    </p>
                    <div className={styles.closeButton}>
                        X
                    </div>
                </div>
                <div className={styles.avataresField}>
                    {listaAvatares.length > 0 ? (
                        !conteudo && (
                            <ul>
                                {listaAutoajuda.map((item, index) => (
                                    <li key={index} onClick={() => { setConteudo(true); setFoco(false); setInfo(item); }}>
                                        {item.imagem && (
                                            <img
                                                className={styles.artigoImagem}
                                                src={item.imagem}
                                                alt={item.titulo}
                                            />
                                        )}
                                        <h3>{item.titulo}</h3>

                                        {item.autor && (
                                            <div>
                                                <img
                                                    className={styles.autorImagem}
                                                    src={item.autor.foto}
                                                    alt={item.autor.nome}
                                                />
                                                <p>{item.autor.nome}</p>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        !conteudo && <p>Nenhum artigo disponível</p>
                    )}
                </div>
            </div>
        </div>
    )
}
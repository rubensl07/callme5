import { useEffect, useState } from "react";
import { getAutoajuda } from "../../funcoes";
// import Sidebar from '../components/Sidebar';
import styles from "../css/Autoajuda.module.css"

const AjudaScreen = ({ onLoad }) => {
    const [listaAutoajuda, setListaAutoajuda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conteudo, setConteudo] = useState(false);
    const [foco, setFoco] = useState(true);
    const [info, setInfo] = useState({})

    useEffect(() => {
        const obterAutoajuda = async () => {
            try {
                const data = await getAutoajuda();
                setListaAutoajuda(data || []);
            } catch (error) {
                console.error("Erro ao obter autoajuda:", error);
            } finally {
                setLoading(false);
            }
        };
        obterAutoajuda();
    }, [onLoad]);

    if (loading) return <p>Carregando...</p>;
    
    return (
        <div className={styles.ajudaScreen}>
           <h2 hidden={conteudo}>O que você procura?</h2>
           <input hidden={conteudo} type="text" placeholder="Não achou o que estava procurando?" name="" id="" />
           <button className={styles.addArtigo} > + </button>
            {listaAutoajuda.length > 0 ? (
                <ul hidden={conteudo}>
                    {listaAutoajuda.map((item, index) => (
                        <li key={index} onClick={() => {setConteudo(true); setFoco(false);setInfo(item)}}  hidden={conteudo}>
                            {item.imagem && (
                                <img 
                                    className={styles.artigoImagem}
                                    src={item.imagem} 
                                    alt={item.titulo} 
                                    hidden={conteudo}
                                />
                            )}
                            <h3 hidden={conteudo}>{item.titulo}</h3>

                            {item.autor && (
                                <div hidden={conteudo}>
                                    <img 
                                        className={styles.autorImagem}
                                        src={item.autor.foto} 
                                        alt={item.autor.nome} 
                                        hidden={conteudo}
                                    />
                                    <p hidden={conteudo}>{item.autor.nome}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p hidden={conteudo}>Nenhum artigo disponível</p>
            )}
            <div className="conteudo" hidden={foco}>
                
                <p className="foco" hidden={foco}>
                    {info.titulo}
                    {info.imagem}
                    {info.conteudo}
                </p>
                
                
            </div>
        </div>
    );

};

export default AjudaScreen;
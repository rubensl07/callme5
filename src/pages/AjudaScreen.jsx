import { useEffect, useState } from "react";
import { getAutoajuda } from "../../funcoes";
// import Sidebar from '../components/Sidebar';
import styles from "../css/Autoajuda.module.css"

const AjudaScreen = ({ onLoad }) => {
    const [listaAutoajuda, setListaAutoajuda] = useState([]);
    const [loading, setLoading] = useState(true);

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
           <h2>O que você procura?</h2>
           <input type="text" placeholder="Não achou o que estava procurando?" name="" id="" />
           <button className={styles.addArtigo}> + </button>
            {listaAutoajuda.length > 0 ? (
                <ul>
                    {listaAutoajuda.map((item, index) => (
                        <li key={index}>
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
            ) : (
                <p>Nenhum artigo disponível</p>
            )}
        </div>
    );
};

export default AjudaScreen;
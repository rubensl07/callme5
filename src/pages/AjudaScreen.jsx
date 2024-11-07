import { useEffect, useState } from "react";
import { getAutoajuda } from "../../funcoes";
 

const AjudaScreen = ({onLoad}) => {
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
    console.log(listaAutoajuda);
    
    return (
        <div>
            {/* Conteúdo do componente */}
        </div>
    );
};

export default AjudaScreen;

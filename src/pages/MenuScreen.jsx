import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import styles from '../css/MenuScreen.module.css';
import NotasComponent from "../components/NotasComponent";

const MenuScreen = ({ navigateToChat }) => {
    const [showPopSquare, setShowPopSquare] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [response, setResponse] = useState('');
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [showWriteSlide, setShowWriteSlide] = useState(false);
    const [showRedSquare, setShowRedSquare] = useState(false); // Estado para o quadrado vermelho
    const [moveWriteSlide, setMoveWriteSlide] = useState(false); // Novo estado para mover o writeSlide

    const handleResponderClick = () => {
        setMoveWriteSlide(true); // Ativa a animação para mover o writeSlide
        setShowRedSquare(true); // Mostra o quadrado vermelho
        setShowInput(false);
    };

    const handleWriteClick = () => {
        setMoveWriteSlide(false); // Reseta a animação ao escrever uma nova nota
        setShowWriteSlide(true);
        setShowInput(true); // Mostra o campo de entrada para escrever uma nova nota
        setResponse(''); // Limpa o campo de resposta
        setCurrentNoteId(null); // Reseta o ID da nota atual
        setShowRedSquare(false); // Esconde o quadrado vermelho
    };

    const handleIconClick = async () => {
        setShowPopSquare(true);
        setShowInput(false);

        if (currentNoteId) {
            const result = await postResposta(currentNoteId);
            if (result.success) {
                console.log('Resposta enviada com sucesso!');
            } else {
                console.log('Erro ao enviar resposta:', result.error || result.data);
            }
        } else {
            console.log('Nova nota:', response);
            // Aqui você pode implementar a lógica para salvar a nova nota
        }
    };

    const handleResponse = (noteId) => {
        setCurrentNoteId(noteId);
        handleResponderClick();
    };

    useEffect(() => {
        let timer;
        if (showPopSquare) {
            timer = setTimeout(() => {
                setShowPopSquare(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showPopSquare]);

    return (
        <div className={styles.menuContainer}>
            <Sidebar navigateToChat={navigateToChat} />

            {!showWriteSlide && (
                <NotasComponent onRespond={handleResponse} />
            )}

            <div className={styles.botoes}>
                <div className={styles.botaoContainer}>
                    <button className={styles.postar} onClick={handleWriteClick}><p>Escrever Nota</p></button>
                    <button className={styles.responder} onClick={handleResponse}><p>Responder Nota</p></button>
                </div>

                <div className={`${styles.popSquare} ${showPopSquare ? styles.fadeIn : styles.fadeOut}`}>
                    <p className={styles.popUp}>Ver sua resposta!</p>
                </div>
            </div>

            <div className={styles.fundoSlide}></div>
            <div className={styles.meioSlide}></div>

            {showWriteSlide && (
                <div className={`${styles.writeSlide} ${moveWriteSlide ? styles.moveLeft : ''}`}>
                    <input
                        className={styles.writeInput}
                        type="text"
                        placeholder="Escreva sua nota..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className={styles.iconEnviar}
                        onClick={handleIconClick}
                    />
                </div>
            )}

            {showRedSquare && (
                <div className={styles.redSquare}></div> // Quadrado vermelho
            )}
        </div>
    );
};

export default MenuScreen;
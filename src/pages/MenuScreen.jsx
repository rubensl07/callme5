import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.css';
// import Carousel from 'react-bootstrap/Carousel';
import { getNotas } from "../../funcoes";
// import '../css/MenuScreen.css';
// import NotasComponent from "../components/NotasComponent"

const MenuScreen =  ({navigateToChat }) => {
  const [showPopSquare, setShowPopSquare] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const handleResponderClick = () => {
    setShowInput(true)
  };

  const handleIconClick = () => {
    setShowPopSquare(true);
    setShowInput(false);
  }

  const listarNotas = async () => {
    try {
      const notasResponse = await getNotas({
        excluidas: false,
        quantity: 10,
      });
      console.log(notasResponse);
      return notasResponse
    } catch (error) {
      console.error(error);
    }
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
    <div className="menu-container">
      <Sidebar navigateToChat={ navigateToChat} />
      <NotasComponent />

      {/* <Carousel>


        {/* <Carousel.Item>
          <div className="notas-container">
            <div className="nota3 nota"></div>
            <div className="nota2 nota"></div>
            <div className="nota1 nota">
              <NotasComponent />
            </div>
            <div className="pin"></div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="notas-container">
            <div className="nota3 nota"></div>
            <div className="nota2 nota"></div>
            <div className="nota1 nota"></div>
            <div className="pin"></div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="notas-container">
            <div className="nota3 nota"></div>
            <div className="nota2 nota"></div>
            <div className="nota1 nota"></div>
            <div className="pin"></div>
          </div>
        </Carousel.Item> 
      </Carousel> */}

      <div className="botoes">
        <div className="botao-container">
          <button className="postar"><p>Escrever Nota</p></button>
          <button className="responder" onClick={handleResponderClick}><p>Responder Nota</p></button>
        </div>

        <div className={`pop-square ${showPopSquare ? 'fade-in' : 'fade-out'}`}>
          <p className="popUp">Ver sua resposta!</p>
        </div>
      </div>

      {showInput && (
        <div className="input-responder">
          <input className="responderInput" type="text" placeholder="Acrescente seu tópico..." />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="icon-enviar"
            onClick={handleIconClick}
          />
        </div>
      )}
    </div>
  );
};

export default MenuScreen;
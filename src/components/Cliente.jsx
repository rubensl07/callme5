import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from '../css/Cadastro.module.css'
import imgGallery from '../importsGallery.json';
import { postCliente } from '/funcoes';

const Cliente = forwardRef((props, ref) => {
    const hidePassIcon = (imgGallery.hidePass);
    const showPassIcon = (imgGallery.showPass);
    const [passIcon, setPassIcon] = useState(hidePassIcon);

    const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
    const [login, setLogin] = useState("teste@email");
    const [nome, setNome] = useState("muriloAlgumaCoisa");
    const [nascimento, setNascimento] = useState("2007-05-15");
    const [senha, setSenha] = useState("12345678");
    const [confirmPassword, setConfirmPassword] = useState("12345678");
    const [idAvatar, setIdAvatar] = useState(1);

    let showPass = false;
    function toggleShowPass() {
        if (showPass) {
            setCurrentVisibilityState('password');
            setPassIcon(hidePassIcon);
        } else {
            setCurrentVisibilityState('text');
            setPassIcon(showPassIcon);
        }
        showPass = !showPass;
    }

    useImperativeHandle(ref, () => ({
        handleRegister
    }));

    const handleRegister = async () => {
        const dados = { nome, login, senha, nascimento, idAvatar };
        let validateStatus = true;

        if (validateStatus && senha !== confirmPassword) {
            validateStatus = false;
            alert("As senhas não coincidem!");
        }
        if (validateStatus && senha.length < 8) {
            validateStatus = false;
            alert("Senha muito curta");
        }
        if (validateStatus && senha.length > 64) {
            validateStatus = false;
            alert("Senha muito longa");
        }
        if (validateStatus && nascimento.length !== 10) {
            validateStatus = false;
            alert("Nascimento Indefinido");
        }
        if (validateStatus && isNaN(idAvatar)) {
            validateStatus = false;
            alert("Avatar Indefinido");
        }

        try {
            if (validateStatus) {
                let response = await postCliente(dados);
                if (response.success) {
                    alert("Cadastro realizado com sucesso!");
                    console.log(response);
                } else {
                    alert(`Erro: Falha ao cadastrar.`);
                }
            }
        } catch (error) {
            alert(`Erro: Falha ao cadastrar.`);
            console.error(error);
        }
    };

    return(
        <div className={styles.inputFieldContainer}>
            <div><p>Nome</p><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div><p>E-mail</p><input type="text" value={login} onChange={(e) => setLogin(e.target.value)} /></div>
            <div><p>Senha</p>
                <input type={currentVisibilityState} value={senha} onChange={(e) => setSenha(e.target.value)} />
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt} />
            </div>
            <div>
                <p>Confirmar senha</p>
                <input type={currentVisibilityState} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt}/>
            </div>
            <div><p>Data de nascimento</p><input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} /></div>
            <div className={styles.full}><p>Avatar</p></div>
        </div>)    

    
});

export default Cliente;
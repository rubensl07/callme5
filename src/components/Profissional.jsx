import React, { useState, forwardRef, useImperativeHandle } from 'react';
import imgGallery from '../importsGallery.json';
import { postProfissional } from '/funcoes';

export default forwardRef((props, ref) => {
    const { styles, checkboxState } = props;

    const hidePassIcon = (imgGallery.hidePass);
    const showPassIcon = (imgGallery.showPass);
    const [passIcon, setPassIcon] = useState(hidePassIcon);
    const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
    const [login, setLogin] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [foto, setFoto] = useState('');
    const [cpf, setCpf] = useState('');
    const [crp, setCrp] = useState('');



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

        const dados = { nome, login, senha, nascimento, foto: "teste", cpf, crp};
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
        if (validateStatus && foto.length>300) {
            validateStatus = false;
            alert("Avatar Indefinido");
        }
        if (validateStatus && cpf.length!=11) {
            validateStatus = false;
            alert("CPF recusado");
        }
        if (validateStatus && crp.length>8) {
            validateStatus = false;
            alert("CRP recusado");
        }

        try {
            if (validateStatus) {
                let response = await postProfissional(dados);
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

    return (
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
            <div className={styles.fileInput}>
                <p>Foto</p>
                <input id='fotoFileInput' type="file" value={foto} onChange={(e) => setFoto(e.target.value)} />
                <label htmlFor="fotoFileInput">
                    <img src={imgGallery.uploadIcon.src} alt={imgGallery.uploadIcon.src} />
                </label>
            </div>
            <div><p>CPF</p><input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} /></div>
            <div><p>CRP</p><input type="number" value={crp} onChange={(e) => setCrp(e.target.value)} /></div>
        </div>
    );
});


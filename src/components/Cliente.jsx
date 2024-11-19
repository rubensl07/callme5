import React, { useState, forwardRef, useImperativeHandle, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import imgGallery from '../importsGallery.json';
import { postCliente, validarEmail } from '/funcoes';
import {AuthContext} from '../../Contexts/AuthContext';

const Cliente = forwardRef((props, ref) => {
    const { styles, checkboxState, setShowAvatarList, avatar} = props;
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    

    const hidePassIcon = (imgGallery.hidePass);
    const showPassIcon = (imgGallery.showPass);
    const [passIcon, setPassIcon] = useState(hidePassIcon);

    const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
    const [login, setLogin] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        let validateStatus = true;

        if(validateStatus && (!login || !nome || !nascimento || !senha || !confirmPassword)){
            validateStatus = false;
            alert("Todos os campos devem ser preenchidos")
        }
        if(validateStatus && !validarEmail(login)){                 
            validateStatus = false;
            alert("E-mail inválido")
        }
        if (validateStatus && senha !== confirmPassword) {
            validateStatus = false;
            alert("As senhas não coincidem!");
        }
        if(validateStatus && !(/\d/.test(senha))){
            validateStatus = false;
            alert("Senha deve conter um número");
        }
        if(validateStatus && !(/[a-z]/.test(senha))){
            validateStatus = false;
            alert("Senha deve conter uma letra minúscula");
        }
        if(validateStatus && !(/[A-Z]/.test(senha))){
            validateStatus = false;
            alert("Senha deve conter uma letra maiúscula");
        }
        if(validateStatus && !(/[^A-Za-z0-9]/.test(senha))){
            validateStatus = false;
            alert("Senha deve conter um caractere especial");
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
        if (validateStatus && (avatar.id ==null ||isNaN(avatar.id))) {
            validateStatus = false;
            alert("Avatar Indefinido");
        }
        if (validateStatus && !checkboxState) {
            validateStatus = false;
            alert("Para se registrar na aplicação é necessário aceitar os termos");
        }

        try {
            const dados = { nome, login, senha, nascimento, idAvatar:avatar.id };
            if (validateStatus) {
                let response = await postCliente(dados);
                if (response?.success) {
                    const responseData = response.data
                    const responseDataDados = responseData.dados                                        
                    const dadosUser = {
                        id: responseData.idCriadoUsuario,
                        nome:responseDataDados.nome,
                        login:responseDataDados.login,
                        data_nascimento:responseDataDados.nascimento,
                        id_avatar:responseDataDados.idAvatar,
                        foto: responseDataDados.foto,
                        tipo_usuario: 1
                    }                    
                    setAuth({
                      isAuthenticated: true,
                      user: dadosUser
                    });        
                    navigate('/perfil'); 
                    alert("Cadastro realizado com sucesso!");
                  } else {
                    if(response.data.status_code==409){
                        alert(`Já existe um usuário cadastrado com esse e-mail`);
                    } else {
                        alert(`Erro: Falha ao cadastrar.`);
                    }
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
            {/* <div onClick={()=>setIdAvatar(e)} className={styles.full}><p>Avatar</p></div> */}
            <div onClick={()=>(setShowAvatarList(true))} className={styles.full}><p>Avatar</p></div>

        </div>)    

    
});

export default Cliente;
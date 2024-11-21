import React, { useState, forwardRef, useImperativeHandle } from 'react';
import imgGallery from '../importsGallery.json';
import { postProfissional } from '/funcoes';
import { customizeAlert, validarEmail } from '../../funcoes';





export default forwardRef((props, ref) => {

    // MySwal.fire({
    //     title: <p>Hello World</p>,
    //     didOpen: () => {
    //         // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    //         MySwal.showLoading()
    //     },
    // }).then(() => {
    //     return MySwal.fire(<p>Shorthand works too</p>)
    // })


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
        try{
            let validateStatus = true
            let mensagemErro = 'Ocorreu um erro'
            if(validateStatus && (!login || !nome || !nascimento || !senha || !confirmPassword)){
                validateStatus = false;            
                mensagemErro = "Todos os campos devem ser preenchidos"
            }
            if(validateStatus && !validarEmail(login)){                 
                validateStatus = false;
                mensagemErro = "E-mail inválido"
            }
            if (validateStatus && senha !== confirmPassword) {
                validateStatus = false;
                mensagemErro = "As senhas não coincidem!"
            }
            if(validateStatus && !(/\d/.test(senha))){
                validateStatus = false;
                mensagemErro = "Senha deve conter um número"
            }
            if(validateStatus && !(/[a-z]/.test(senha))){
                validateStatus = false;
                mensagemErro = "Senha deve conter uma letra minúscula"
            }
            if(validateStatus && !(/[A-Z]/.test(senha))){
                validateStatus = false;
                mensagemErro = "Senha deve conter uma letra maiúscula"
            }
            if(validateStatus && !(/[^A-Za-z0-9]/.test(senha))){
                validateStatus = false;
                mensagemErro = "Senha deve conter um caractere especial"
            }
            if (validateStatus && senha.length < 8) {
                validateStatus = false;
                mensagemErro = "Senha muito curta"
            }
            if (validateStatus && senha.length > 64) {
                validateStatus = false;
                mensagemErro = "Senha muito longa"
            }
            if (validateStatus && nascimento.length !== 10) {
                validateStatus = false;
                mensagemErro = "Nascimento Indefinido"
            }
            if (validateStatus && cpf.length != 11) {
                validateStatus = false;
                mensagemErro = "CPF recusado"
            }
            if (validateStatus && !foto) {
                validateStatus = false;
                mensagemErro = "Foto indefinida"
            }
            if (validateStatus && !checkboxState) {
                validateStatus = false;
                mensagemErro = "Para se registrar na aplicação é necessário aceitar os termos"
            }
            if(!validateStatus){
                customizeAlert({mensagem:mensagemErro,code:3})
            } else {
                const formData = new FormData();
                formData.append('nome', nome);
                formData.append('login', login);
                formData.append('senha', senha);
                formData.append('nascimento', nascimento);
                formData.append('cpf', cpf);
                formData.append('fotoPerfil', foto);
                formData.append('crp', crp);
        
                let result = await postProfissional(formData);
                if (result?.success) {
                    const dadosUser = {
                        id: result.data.idCriadoUsuario,
                        foto: result.data.dados.foto,
                        login: result.data.dados.login,
                        nome: result.data.dados.nome,
                        data_nascimento: result.data.dados.nascimento,
                        cpf: result.data.dados.cpf,
                        crp: result.data.dados.crp,
                        tipo_usuario: 3
                    }
                    setAuth({
                        isAuthenticated: true,
                        user: dadosUser
                    });
                    navigate('/perfil');
                    alert({mensagem: "Cadastro realizado com sucesso!",code:1})
                } else {
                    if (result.data.status_code == 409) {
                        alert({mensagem: "Já existe um usuário cadastrado com esse e-mail",code:3})
                    } else {
                        customizeAlert({mensagem: "Falha ao cadastrar",code:2})
                    }
            }
            }
} catch (error) {
    customizeAlert({mensagem: "Falha ao cadastrar",code:2})
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
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt} />
            </div>
            <div><p>Data de nascimento</p><input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} /></div>
            <div className={styles.fileInput}>
                <p>Foto</p>
                <input id='fotoFileInput' type="file" value={foto} onChange={(e) => setFoto(e.target.value)} />
                <label htmlFor="fotoFileInput">
                    <img src={!foto ? imgGallery.uploadUnselectedIcon.src : imgGallery.uploadSelectedIcon.src} alt={imgGallery.uploadUnselectedIcon.src} />
                </label>
            </div>
            <div><p>CPF</p><input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} /></div>
            <div><p>CRP</p><input type="number" value={crp} onChange={(e) => setCrp(e.target.value)} /></div>
        </div>
    );
});


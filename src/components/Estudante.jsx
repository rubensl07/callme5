import React, { useState, forwardRef, useImperativeHandle, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import imgGallery from '../importsGallery.json';
import { postEstudante, validarEmail } from '/funcoes';
import { AuthContext } from '../../Contexts/AuthContext';

const Estudante = forwardRef((props, ref) => {
    const { styles, checkboxState } = props;
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const hidePassIcon = (imgGallery.hidePass);
    const showPassIcon = (imgGallery.showPass);
    const [passIcon, setPassIcon] = useState(hidePassIcon);

    const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
    const [login, setLogin] = useState("teste@email.com");
    const [nome, setNome] = useState("muriloAlgumaCoisa");
    const [nascimento, setNascimento] = useState("2007-05-15");
    const [senha, setSenha] = useState("12345678aA@");
    const [confirmPassword, setConfirmPassword] = useState("12345678aA@");
    const [foto, setFoto] = useState(null);
    const [declaracaoEscolaridade, setDeclaracaoEscolaridade] = useState(null);
    const [cpf, setCpf] = useState('12345678910');
    const [isLoading, setIsLoading] = useState(true);


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

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };
    const handleDeclaracaoEscolaridadeChange = (e) => {
        setDeclaracaoEscolaridade(e.target.files[0]);
    };

    const handleRegister = async () => {
        try {

            if ((!login || !nome || !nascimento || !senha || !confirmPassword || !cpf)) {
                alert("Todos os campos devem ser preenchidos")
            }
            if (!validarEmail(login)) {
                alert("E-mail inválido")
                return;
            }
            if (senha !== confirmPassword) {
                alert("As senhas não coincidem!");
                return;
            }
            if (!(/\d/.test(senha))) {
                alert("Senha deve conter um número");
                return;
            }
            if (!(/[a-z]/.test(senha))) {
                alert("Senha deve conter uma letra minúscula");
                return;
            }
            if (!(/[A-Z]/.test(senha))) {
                alert("Senha deve conter uma letra maiúscula");
                return;
            }
            if (!(/[^A-Za-z0-9]/.test(senha))) {
                alert("Senha deve conter um caractere especial");
                return;
            }
            if (senha.length < 8) {
                alert("Senha muito curta");
                return;
            }
            if (senha.length > 64) {
                alert("Senha muito longa");
                return;
            }
            if (cpf.length != 11) {
                alert("CPF recusado");
                return;
            }
            if (nascimento.length !== 10) {
                alert("Nascimento Indefinido");
                return;
            }
            if ((!foto)) {
                alert("Foto indefinida");
                return;
            }
            if ((!declaracaoEscolaridade)) {
                alert("Declaração de escolaridade indefinida");
                return;
            }
            if (!checkboxState) {
                alert("Para se registrar na aplicação é necessário aceitar os termos");
                return;
            }
                setIsLoading(true);
                const formData = new FormData();
                formData.append('nome', nome);
                formData.append('login', login);
                formData.append('senha', senha);
                formData.append('nascimento', nascimento);
                formData.append('cpf', cpf);
                formData.append('fotoPerfil', foto);
                formData.append('declaracaoEscolaridade', declaracaoEscolaridade);

                let result = await postEstudante(formData);
                if (result?.success) {
                    const dadosUser = {
                        id: result.data.idCriadoUsuario,
                        foto: result.data.dados.foto,
                        login: result.data.dados.login,
                        nome: result.data.dados.nome,
                        data_nascimento: result.data.dados.nascimento,
                        cpf: result.data.dados.cpf,
                        declaracaoEscolaridade: result.data.dados.declaracaoEscolaridade,
                        tipo_usuario: 2
                    }

                    setAuth({
                        isAuthenticated: true,
                        user: dadosUser
                    });
                    navigate('/perfil');
                    alert("Cadastro realizado com sucesso!");
                } else {
                    if (result.data.status_code == 409) {
                        alert(`Já existe um usuário cadastrado com esse e-mail`);
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
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt} />
            </div>
            <div><p>Data de nascimento</p><input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} /></div>
            <div className={styles.fileInput}>
                <p>Foto</p>
                
                <input id='fotoFileInput'  name="foto" type="file" accept="image/*" onChange={handleFotoChange} />
                <label htmlFor="fotoFileInput">
                    <img src={imgGallery.uploadIcon.src} alt={imgGallery.uploadIcon.src} />
                </label>
            </div>
            <div><p>CPF</p><input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} /></div>
            <div className={styles.fileInput}>
                <p>Comprovante de escolaridade</p>
                <input id='declaracaoEscolaridadeFileInput' name="declaracaoEscolaridade" type="file" accept="application/pdf" onChange={handleDeclaracaoEscolaridadeChange} />
                <label htmlFor="declaracaoEscolaridadeFileInput">
                    <img src={imgGallery.uploadIcon.src} alt={imgGallery.uploadIcon.src} />
                </label>
            </div>
        </div>
    );
});

export default Estudante;
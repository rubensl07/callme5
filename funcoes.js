//const link = 'http://localhost:8080'
// const link = 'https://acme-filmes-back.onrender.com'
// const link = 'https://teste20241002-esh7gjgfc2hygtf0.brazilsouth-01.azurewebsites.net'
const url = 'http://localhost:3000'
const versao = 'v1'
const link = `${url}/${versao}/callme`

export async function getUsuarios(){
    
    const url = `${link}/usuarios`
    const response = await fetch(url)
    const data = await response.json()

    return data.dados
}

export async function getNotas(params){
    
    let url = `${link}/notas?`
    if(params.excluidas){
        url += `&excluidas=${params.excluidas}`
    }
    if(params.quantity){
        url += `&quantity=${params.quantity}`
    }
    const response = await fetch(url)
    const data = await response.json()

    return data.dados
}


export async function postCliente(dados) {
    const url = `${link}/cliente`;
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    };
  
    try {
      console.log(dados);
      
      const response = await fetch(url, options);
      const data = await response.json(); 
      return { success: response.ok, data }; 
    } catch (error) {
      console.error('Erro ao enviar dados: ', error);
      return { success: false, data: null }; 
    }
}
export async function postEstudante(dados) {
  const url = `${link}/estudante`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null }; 
  }
}
export async function postProfissional(dados) {
  const url = `${link}/profissional`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null }; 
  }
}

export async function getAutoajuda(){
  const url = `${link}/autoajudas`
  const response = await fetch(url)
  const data = await response.json()
  return data.dados
}

export async function validateLogin(dados) {
    const url = `${link}/login`;
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json(); 
      return { success: response.ok, data }; 
    } catch (error) {
      console.error('Erro ao enviar dados: ', error);
      return { success: false, data: null }; 
    }
}

export async function enviarPasswordRecovery(dados) {
  const url = `${link}/recuperacaosenha/enviaremail`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 
    return { success: response.ok, data }; 
  } catch (error) {
    console.error('Erro ao enviar dados: ', error);
    return { success: false, data: null }; 
  }
}

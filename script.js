async function buscarEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""

    try {
        var consultarCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultarCEPConvertido = await consultarCEP.json();

        if(consultarCEPConvertido.erro) {
            throw Error('CEP não existente!');
        }
        preencherCampos(consultarCEPConvertido)
        console.log(consultarCEPConvertido)

        return consultarCEPConvertido
    } catch (erro) {
        limparCampos()
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    }

}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));


function preencherCampos(dados) {
    const logradouro = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    logradouro.value = dados.logradouro;
    bairro.value = dados.bairro;
    cidade.value = dados.localidade;
    estado.value = dados.uf;
}

function limparCampos() {
    const logradouro = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    logradouro.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
}


// const btnEnviar = document.getElementById('enviar')

// btnEnviar.addEventListener("click", evento => {
//     evento.preventDefault()

//     const inputCEP = document.getElementById('cep')
//     const valorCEP = inputCEP.value.replace(/-/g, "")
//     console.log(valorCEP)

//     const URL = `https://viacep.com.br/ws/${valorCEP}/json`
//     fetch(URL)
//     .then(response => response.json())
//     .then(dados => {preencherCampos(dados); console.log(dados)})
//     .catch(erro => console.log(erro))
// })

// function preencherCampos(dados) {
//     const rua = document.getElementById('endereco');
//     const complemento = document.getElementById('complemento');
//     const bairro = document.getElementById('bairro');
//     const cidade = document.getElementById('cidade');
//     const estado = document.getElementById('estado')

//     rua.value = dados.logradouro;
//     complemento.value = dados.complemento;
//     bairro.value = dados.bairro;
//     cidade.value = dados.localidade;
//     estado.value = dados.uf;
// }
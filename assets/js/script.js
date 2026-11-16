var dadosCep;
var dados;

let nom;
let datanasc;
let cargo;
let turset;
let cep;
let rua;
let num;
let comp;
let bairro;
let cidade;
let estado;

let user ={
    nome: '',
    datanasc: '',
    cargo: '',
    turset: '',
    cep: '',
    rua: '',
    num: '',
    comp: '',
    bairro: '',
    cidade: '',
    estado: ''
}

async function envcep(){
    cep = document.getElementById('incep').value; 

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            dadosCep = dados;
    })
    .catch(error =>{
        alert('Erro na busca do CEP');
        return;
    });

    if(dadosCep){
        document.getElementById('inrua').value = dadosCep.logradouro;
        document.getElementById('inbairro').value = dadosCep.bairro;
        document.getElementById('incidade').value = dadosCep.localidade;
        document.getElementById('inestado').value = dadosCep.uf + "-" + dadosCep.estado;
    } else{
        alert('Erro ao retornar os dados');
        return;
    }
}

function enviar(){
    nom = document.getElementById('inname').value.trim();
    datanasc = document.getElementById('indata').value.trim();
    cargo = document.getElementById('incargo').value.trim();
    turset = document.getElementById('inturset').value.trim();
    cep = document.getElementById('incep').value.trim();
    rua = document.getElementById('inrua').value.trim(); 
    num = document.getElementById('innum').value.trim();
    comp = document.getElementById('incomp').value.trim();
    bairro = document.getElementById('inbairro').value.trim();
    cidade = document.getElementById('incidade').value.trim();
    estado = document.getElementById('inestado').value.trim();

    if(nom == "" || datanasc == "" || cargo == "" || turset == "" || cep == "" || rua == "" || num == "" || bairro == "" || cidade == "" || estado == ""){
        alert("Dados inseridos inválidos");
        return;
    } 

    user.nome = nom;
    user.datanasc = datanasc;
    user.cargo = cargo;
    user.turset = turset;
    user.cep = cep;
    user.rua = rua;
    user.num = num;
    user.comp = comp;
    user.bairro = bairro;
    user.cidade = cidade;
    user.estado = estado;

    localStorage.setItem('dadosUser', JSON.stringify(user));

    alert("Dados enviados com sucesso!");
}

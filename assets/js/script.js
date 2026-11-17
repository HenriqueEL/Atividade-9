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

    let listaUsuarios = JSON.parse(localStorage.getItem('dadosUser')) || [];

    let user = {
        nome: nom,
        datanasc: datanasc,
        cargo: cargo,
        turset: turset,
        cep: cep,
        rua: rua,
        num: num,
        comp: comp,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    }

    listaUsuarios.push(user);

    localStorage.setItem('dadosUser', JSON.stringify(listaUsuarios));

    alert("Dados enviados com sucesso!");

    listarDados();
}

function listarDados(){
    let listaUsuarios = JSON.parse(localStorage.getItem('dadosUser')) || [];

    let tblCorp = document.getElementById('corp'); 

    tblCorp.innerHTML = '';

    listaUsuarios.forEach((user, index) => {
        document.getElementById('num-integ').textContent = listaUsuarios.length;

        tblCorp.innerHTML += `
        <tr class = 'linha'>
            <td>${user.nome}
            <td>${user.cargo}
            <td>${user.datanasc}
            <td>${user.turset}
            <td>${user.cep}
            <td>${user.rua}
            <td>${user.num}
            <td>${user.comp}
            <td>${user.bairro}
            <td>${user.cidade}
            <td>${user.estado}
            <td>
                <button class = 'edit' onclick = 'editar(${index})'>Editar
                <button class = 'excluir' onclick = 'exclua(${index})'>Excluir
        `
    });
}

listarDados();

function exclua(index){
    let listaUsuarios = JSON.parse(localStorage.getItem('dadosUser')) || [];

    listaUsuarios.splice(index, 1);

    localStorage.setItem('dadosUser', JSON.stringify(listaUsuarios));

    localStorage.setItem('numInteg', listaUsuarios.length);
    document.getElementById('num-integ').textContent = listaUsuarios.length;

    listarDados();
}
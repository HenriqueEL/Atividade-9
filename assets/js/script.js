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

let indexEdicao = -1;

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

    if(indexEdicao == -1){
        listaUsuarios.push(user);
        alert('Dados enviados com sucesso!');
    } else{
        listaUsuarios[indexEdicao] = user;
        alert('Dados atualizados com sucesso!');
        indexEdicao = -1;
    }

    localStorage.setItem('dadosUser', JSON.stringify(listaUsuarios));

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
            <td>${user.nome}</td>
            <td>${user.cargo}</td>
            <td>${user.datanasc}</td>
            <td>${user.turset}</td>
            <td>${user.cep} - ${user.estado} | ${user.cidade}  ${user.rua}, ${user.num} ${user.comp} ${user.bairro}</td>
            <td>
                <button id='edit' class='acao' onclick = 'editar(${index})'><img src="assets/imagem/edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="botão para editar">
                <button id='excluir' class='acao' onclick = 'exclua(${index})'><img src="assets/imagem/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="botão para deletar">
            </td>
        `
    });
}

listarDados();

function exclua(index){
    let listaUsuarios = JSON.parse(localStorage.getItem('dadosUser')) || [];
    let usuerExclua = listaUsuarios[index];

    const confirmar = confirm(`Tem certeza que deseja excluir ${usuerExclua.nome}?`);

    if(confirmar){
        listaUsuarios.splice(index, 1);

        localStorage.setItem('dadosUser', JSON.stringify(listaUsuarios));

        localStorage.setItem('numInteg', listaUsuarios.length);
        document.getElementById('num-integ').textContent = listaUsuarios.length;

        listarDados();
    } else{
        alert('Exclusão cancelada')
    }
}

function editar(index){
    let listaUsuarios = JSON.parse(localStorage.getItem('dadosUser')) || [];

    let user = listaUsuarios[index];

    document.getElementById('inname').value = user.nome;
    document.getElementById('indata').value = user.datanasc;
    document.getElementById('incargo').value = user.cargo;
    document.getElementById('inturset').value = user.turset;
    document.getElementById('incep').value = user.cep;
    document.getElementById('inrua').value = user.rua;
    document.getElementById('innum').value = user.num;
    document.getElementById('incomp').value = user.comp;
    document.getElementById('inbairro').value = user.bairro;
    document.getElementById('incidade').value = user.cidade;
    document.getElementById('inestado').value = user.estado;

    indexEdicao = index;

    alert("Para modificar os dados altere os dados que estão na aba de cadastro e reenvie")
}
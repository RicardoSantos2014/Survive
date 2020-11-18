var personagem = {
    nome: "",
    ataque: "",
    dano: 0,
    defesa: 0,
};
var party = [];

var inimigos = {
    nome: "",
    ataque: "",
    dano: 0,
    defesa: 0,
};

var diferencaDeAcerto = [];

var chanceDeAcerto = [];

// document.onload = () => {
//     button = document.getElementById("btnAddPartyMember").addEventListener('click', addPlayerToPartyFunction);
//     partyList = document.getElementById("personagensDaParty");
//     nomePersonagem = document.getElementById("nomePersonagem");
//     ataquePersonagem = document.getElementById("ataquePersonagem");
// }

// function addPlayerToPartyFunction() {
//     partyList.innerHTML = `<div> ${nomePersonagem.value} </div>`;
// }

$(document).ready(function(){
    $('#nomePersonagem').val("");
    $('#ataquePersonagem').val("");
    $('#danoPersonagem').val("");
    $('#defesaPersonagem').val("");

    $('#nomeInimigo').val("");
    $('#ataqueInimigo').val("");
    $('#danoInimigo').val("");
    $('#defesaInimigo').val("");

    $("#btnAddPartyMember").click(() => {
        if ($('#nomePersonagem').val() != "" )
        {
            novoPersonagem = {
                nome: $('#nomePersonagem').val(),
                ataque: $('#ataquePersonagem').val(),
                dano: $('#danoPersonagem').val(),
                defesa: $('#defesaPersonagem').val(),
            };
            party.push(novoPersonagem);
            $(`<p> <div class="divNome"> ${novoPersonagem.nome} </div>
                    <div class="divAtaque"> ${novoPersonagem.ataque} </div>
                    <div class="divDano"> ${novoPersonagem.dano} </div>
                    <div class="divDefesa"> ${novoPersonagem.defesa} </div> </p>`).appendTo('#personagensDaParty');
            $('#nomePersonagem').val("");
            $('#ataquePersonagem').val("");
            $('#danoPersonagem').val("");
            $('#defesaPersonagem').val("");
        }
    });

    $("#botaoCalcular").click(() => {
        if ($('#nomeInimigo').val() != "" )
        {
            inimigos = {
                nome: $('#nomeInimigo').val(),
                ataque: $('#ataqueInimigo').val(),
                dano: $('#danoInimigo').val(),
                defesa: $('#defesaInimigo').val(),
            };
            $(`<p> <div class="divNome"> ${inimigos.nome} </div>
                    <div class="divAtaque"> ${inimigos.ataque} </div>
                    <div class="divDano"> ${inimigos.dano} </div>
                    <div class="divDefesa"> ${inimigos.defesa} </div> </p>`).appendTo('#inimigosDaParty');
            $('#nomeInimigo').val("");
            $('#ataqueInimigo').val("");
            $('#danoInimigo').val("");
            $('#defesaInimigo').val("");
        }
        //$(`<p> <div> Os personagens têm ${calcularChanceDeVitoria()}% de chance de vencer a batalha. </div> </p>`).appendTo('#relatorioDeCombate');
        $(`<p> <div> <h1 class="tituloRelatorio"> Relatório de combate contra o ${inimigos.nome} </h1> </div> </p>`).appendTo('#relatorioDeCombate');

        calcularDiferencaDeAcerto();

        party.forEach((persona, index) => {
            $(`<p> <div> O personagem ${persona.nome} e precisa de ${diferencaDeAcerto[index]} ou mais para acertar, 
                resultando em acertos ${chanceDeAcerto[index]}% das vezes com dano médio de ${d20.meanDamage(persona.dano).toFixed(2)} por ataque bem-sucedido, o 
                que resulta em um dano médio de ${(chanceDeAcerto[index]*persona.dano).toFixed(2)} durante o combate.
                 </div> </p> `).appendTo('#relatorioDeCombate');
        });

    });

  });

  function calcularDiferencaDeAcerto() {
  
      party.forEach((personagemDaVez, index) => {
          if( (inimigos.defesa - personagemDaVez.ataque) > 0 ){
            diferencaDeAcerto.push((inimigos.defesa - personagemDaVez.ataque));
            chanceDeAcerto.push((100*(1 - (diferencaDeAcerto[index]/20))).toFixed(2));
          }
      });
  }

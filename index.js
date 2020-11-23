var personagem = {
    nome: "",
    ataque: "",
    dano: 0,
    defesa: 0,
    danoMedio: 0,
    vida: 0,
};
var party = [];

var inimigos = [];

var diferencaDeAcerto = [];

var chanceDeAcerto = [];

$(document).ready(function(){
    $('#nomePersonagem').val("");
    $('#ataquePersonagem').val("");
    $('#danoPersonagem').val("");
    $('#defesaPersonagem').val("");
    $('#pontosDeVidaPersonagem').val("");    

    $('#nomeInimigo').val("");
    $('#ataqueInimigo').val("");
    $('#danoInimigo').val("");
    $('#defesaInimigo').val("");
    $('#pontosDeVidaInimigo').val("");

    $("#btnAddPartyMember").click(() => {
        if ($('#nomePersonagem').val() != "" )
        {
            personagem = {
                nome: $('#nomePersonagem').val(),
                ataque: $('#ataquePersonagem').val(),
                dano: $('#danoPersonagem').val(),
                defesa: $('#defesaPersonagem').val(),
                danoMedio: parseFloat(d20.meanDamage($('#ataquePersonagem').val())),
                vida: $('#pontosDeVidaPersonagem').val(),
            };
            party.push(personagem);
            $(`<p> <div class="divNome"> ${personagem.nome} </div>
                    <div class="divAtaque"> ${personagem.ataque} </div>
                    <div class="divDano"> ${personagem.dano} </div>
                    <div class="divDefesa"> ${personagem.defesa} </div> 
                    <div class="divVida"> ${personagem.vida} </div>  </p> <br/>`).appendTo('#personagensDaParty');
            $('#nomePersonagem').val("");
            $('#ataquePersonagem').val("");
            $('#danoPersonagem').val("");
            $('#defesaPersonagem').val("");
            $('#pontosDeVidaPersonagem').val("");   
        }
    });

    $("#botaoCalcular").click(() => {
        if ($('#nomeInimigo').val() != "" )
        {
            personagem = {
                nome: $('#nomeInimigo').val(),
                ataque: $('#ataqueInimigo').val(),
                dano: $('#danoInimigo').val(),
                defesa: $('#defesaInimigo').val(),
                danoMedio: parseFloat(d20.meanDamage($('#ataqueInimigo').val())),
                vida: $('#pontosDeVidaInimigo').val(),
            };
            inimigos.push(personagem)
            $(`<p> <div class="divNome"> ${personagem.nome} </div>
                    <div class="divAtaque"> ${personagem.ataque} </div>
                    <div class="divDano"> ${personagem.dano} </div>
                    <div class="divDefesa"> ${personagem.defesa} </div> 
                    <div class="divVida"> ${personagem.vida} </div> </p> <br/>`).appendTo('#inimigosDaParty');
            $('#nomeInimigo').val("");
            $('#ataqueInimigo').val("");
            $('#danoInimigo').val("");
            $('#defesaInimigo').val("");
            $('#pontosDeVidaInimigo').val("");
        }
        $(`<p> <div> <h1 class="tituloRelatorio"> Relatório de combate contra o ${inimigos[0].nome} </h1> </div> </p>`).appendTo('#relatorioDeCombate');

        calcularDiferencaDeAcerto();

        valorDanoTotalParty = danoTotalParty();

        party.forEach((persona, index) => {
            $(`<p> <div> O personagem ${persona.nome} e precisa de ${diferencaDeAcerto[index]} ou mais para acertar, 
                resultando em acertos ${chanceDeAcerto[index]}% das vezes com dano médio de ${persona.danoMedio} por ataque bem-sucedido, o 
                que resulta em um dano médio de ${((chanceDeAcerto[index]/100)*persona.danoMedio).toFixed(2)} por turno de combate. </div> </p> `).appendTo('#relatorioDeCombate');
        });

        danoPartyMedio = danoMedioParty();
        turnosDoCombate = (inimigos[0].vida/danoPartyMedio).toFixed(2);
        taxaDeAcerto = chanceDeAcertoTotal().toFixed(2);

        $(`<br/> <br/> <div> <p> O dano total da party por turno é de ${danoPartyMedio}, o que significa que o combate dura no mínimo ${turnosDoCombate} 
            turnos para o fim do combate com probabiliadde de ${taxaDeAcerto**turnosDoCombate}. </p> </div> </p>`).appendTo('#relatorioDeCombate');

    });

  });

  function danoTotalParty() {
      danoTotal = 0.0;

      party.forEach((personagemDaParty, index) => {
          danoTotal += parseFloat(personagemDaParty.danoMedio);
      });

      return danoTotal.toFixed(2);
  }

  function danoMedioParty() {
      danoTotal = 0.0;

      party.forEach((personagemParty, index) => {
          danoTotal += (personagemParty.danoMedio*(chanceDeAcerto[index]/100));
      });
      
      return danoTotal.toFixed(2);
  }

  function chanceDeAcertoTotal() {
      probabilidadeTotal = 1.0;

      chanceDeAcerto.forEach((valor, index) => {
          probabilidadeTotal *= valor;
      });

      return probabilidadeTotal;
      
  }

  function calcularDiferencaDeAcerto() {
  
      party.forEach((personagemDaVez, index) => {
          if( (inimigos[0].defesa - personagemDaVez.ataque) > 0 ){
            diferencaDeAcerto.push((inimigos[0].defesa - personagemDaVez.ataque));
            chanceDeAcerto.push((100*(1 - (diferencaDeAcerto[index]/20))).toFixed(2));
            personagemDaVez.danoMedio = d20.meanDamage(personagemDaVez.dano).toFixed(2);
          }
      });
  }

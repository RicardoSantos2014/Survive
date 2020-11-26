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
    /**
     * Initially, the page form must be cleared and gotten ready to data input.
     */

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
            /**
            * When the "Add Party Member" button is clicked, the party data is stored in an array and readied to be shown in the page and afterwards
            * the input fields are cleared.
            * 
            */
            personagem = {
                nome: $('#nomePersonagem').val(),
                ataque: $('#ataquePersonagem').val(),
                dano: $('#danoPersonagem').val(),
                defesa: $('#defesaPersonagem').val(),
                danoMedio: parseFloat(d20.meanDamage($('#ataquePersonagem').val())),
                vida: $('#pontosDeVidaPersonagem').val(),
            };
            party.push(personagem);
            $(`<div class="divTableCell">${personagem.nome}</div>
                <div class="divTableCell">${personagem.ataque}</div>
                <div class="divTableCell">${personagem.dano}</div>
                <div class="divTableCell">${personagem.defesa}</div>
                <div class="divTableCell">${personagem.vida}</div>`).appendTo('#personagensDaParty');
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
            /**
             * When the "Calculate" button is clicked, the enemy data is loaded into an array and shown in the web page.
             * 
             * In a future update, it will be possible to add more than one enemy to simulate the battle. At this time, however, the 
             * model will only supprt one enemy to make the mathematics easier.
             */
            personagem = {
                nome: $('#nomeInimigo').val(),
                ataque: $('#ataqueInimigo').val(),
                dano: $('#danoInimigo').val(),
                defesa: $('#defesaInimigo').val(),
                danoMedio: parseFloat(d20.meanDamage($('#ataqueInimigo').val())),
                vida: $('#pontosDeVidaInimigo').val(),
            };
            inimigos.push(personagem)
            $(`<div class="divTableCell">${personagem.nome}</div>
                <div class="divTableCell">${personagem.ataque}</div>
                <div class="divTableCell">${personagem.dano}</div>
                <div class="divTableCell">${personagem.defesa}</div>
                <div class="divTableCell">${personagem.vida}</div>`).appendTo('#inimigosDaParty');
            $('#nomeInimigo').val("");
            $('#ataqueInimigo').val("");
            $('#danoInimigo').val("");
            $('#defesaInimigo').val("");
            $('#pontosDeVidaInimigo').val("");
        }

        // In this line we display the enemy name to create the battle report
        $(`<p> <div> <h1 class="tituloRelatorio"> Relatório de combate contra o ${inimigos[0].nome} </h1> </div> </p>`).appendTo('#relatorioDeCombate');

        /**
         * In the next function, we calculate the probability to hit the enemy for each party member. This information is stored in the array
         * that contains the characters data.
         */
        calcularDiferencaDeAcerto();

        /**
         * In the next function, the total damage of the party is calculated based on how much damage each character deals and their probability 
         * to hit the enemy
         */
        valorDanoTotalParty = danoTotalParty();

        /**
         * Now, for each character the statistical elements are calculated and the 
         */
        party.forEach((persona, index) => {
            $(`<p> <div> O personagem ${persona.nome} e precisa de ${diferencaDeAcerto[index]} ou mais para acertar, 
                resultando em acertos ${chanceDeAcerto[index]}% das vezes com dano médio de ${persona.danoMedio} por ataque bem-sucedido, o 
                que resulta em um dano médio de ${((chanceDeAcerto[index]/100)*persona.danoMedio).toFixed(2)} por turno de combate. </div> </p> `).appendTo('#relatorioDeCombate');
        });

        danoPartyMedio = danoMedioParty();
        turnosDoCombate = (inimigos[0].vida/danoPartyMedio).toFixed(2);
        taxaDeAcerto = chanceDeAcertoTotal().toFixed(2);

        $(`<br/> <div> <p> O dano total da party por turno é de ${danoPartyMedio} pontos de dano, o que significa que o combate dura no mínimo ${turnosDoCombate} 
            até fim e a probabiliadde de isto acontecer é de aproximadamente ${(((taxaDeAcerto/100)**turnosDoCombate)*100).toFixed(2)}%. </p> </div> </p>`).appendTo('#relatorioDeCombate');

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

$(function()
{
	var Dim=0, // Dimensión Inicial del Juego
		Niv=0, // Nivel Inicial del Juego
		Posiciones = [],  // Iniciación del Array de posiciones Aleatorias
		TiempoMax = 1200, // Tiempo máximo para la velocidad en la que aparecerán y desaparecerán los cuadros a adivinar
		Porcentaje = 20,  // Valiable que determina el porcentaje, para la velocidad a la que aparecerán y desaparecerán los cuadros a adivinar
		Puntaje=0, // variable que guardara el puntaje del usuario  
		tiempo = 1000; //Velocidad del reloj en milisegundos
		clickInicio = 0,
		segundos = 00;
		minutos = 00;
		horas = 00;
		stop = false;
	var PosUser  = [], // Iniciación array, guarda las posiciones correctas dadas por el usuario
		numExito = 0, // Variable utilzida para determinar cuantos existos ha tenido el usuario en un escenario
		ganados  = 0, // Variable que determina cuantos escenarios a superado el usuario
		numClick = 0, // Variable que guarda el numero de clicks realizados por el usuario
		Ayudas = 3;
		Juego = []; //Numero de Ayudas iniciales

// Inicialización de componentes repetitivos del DOM
	var DomPuntos = $("#Puntos"),
		DomMensajes = $('#Mensajes'),
		DomNum = $("#NumeroaBuscar");

	function iniciaJuego(){
		Juego = lib.generaGrilla();
		if(Juego[0].length === 12){Juego[0].shift(); DibujaJuego(Juego);}else{DibujaJuego(Juego);};
	}iniciaJuego();

// Función que permite dibujar la cuadricula en el id="Juego" segun la mariz optenida por lib.creaJuego() del Archivo juego.js
function DibujaJuego(Juego){
      DomMensajes.html("");
      DomNum.html(numClick+1);
       var tds = `<table id="MyTable">
                    <tbody>`;
    	for (var i = 0; i < Juego.length; i++) {
    		tds += '<tr>';
    		for (var j = 0; j < Juego[i].length; j++) {
    				if(!Juego[i][j].Clickeado){
    					tds += `<td><div id="${Juego[i][j].Id}" class="cuadrado ${Juego[i][j].Clase}" style="background-color:${Juego[i][j].Color}"><div id="Numero">${Juego[i][j].Numero}<div></div></td>`;
    				}
    		};
    		tds += `</tr>`;
    	};
    		tds += `</tbody>
              </table>`;
			$("#Juego").html(tds);
// Se asignan los eventos a todos los div de clase .cuadrado			
	$(".cuadrado").click(function() {
		  numClick++;
          var oID = $(this).attr("id");
          console.log(oID);
          //valida(oID);
          console.log(validaClick(oID,numClick));
	});

}

// función que permite generar un tiempo, para la velocidad con la que se muestran los cuadrados a adivinar 
function GeneraTiempo(level){
	return TiempoMax - ((TiempoMax * (level*Porcentaje))/100);	
}


function validaClick(id,click){
 var idSeparado = id.split("_");
	if(Juego[idSeparado[0]][idSeparado[1]].Numero === click){
		Juego[idSeparado[0]][idSeparado[1]].Clickeado = true;
		$("#"+id).removeClass("cuadrado ").addClass("Puntaje");
		$("#"+id).html("<div id='Numero'><b>¡10 puntos!<b></div>").fadeOut(800);
		DomPuntos.html(Puntaje+=10);
		DomNum.html(numClick+1);
		return true;
	}else{
		numClick--;
		return false;
	}

}


function validaPos(id){
	for (var i = 0; i < Posiciones.length; i++) {
 		if(Posiciones[i]===id){
 			console.log(i);
 			return i;
 		}
 	}
 	return null;
}

// Función obtenida de http://www.paulirish.com/2009/random-hex-color-code-snippets/ genera colores aleatoriamente
function randomColor()
	{
	   	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
	   	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
	};

// Genera el tiempo para completar el juego y lo muestra en el DOM
function timer(){
	var segundosString = '00',
		minutosString = '00',
		horasString = '00';
	if(!stop){	
		if(segundos<=60){
			segundosString = segundos<10 ? "0"+segundos++ : segundos++;
		}else if(minutos<=60){
			minutos++;
			minutosString = minutos<10 ? "0"+minutos++ : minutos++;
			segundos=0;
		}else if(horas<=24){
			horas++;
			horasString = horas<10 ? "0"+horas++ : horas++;
			minutos=0;
		}
		$("#Cronometro").html(horasString+":"+minutosString+":"+segundosString);
		setTimeout(function(){timer()},tiempo);
	}
}timer();
// Muestra los cuadrados que le hacen falta al usuario
function Ayuda(){
	var clase = lib.generaClases();
	$("#"+Posiciones[numClick])
				.css("background-color",randomColor())
				.addClass("animated "+clase);
	setTimeout(function(){
		$('#'+Posiciones[numClick])
				.removeClass("animated "+clase)
				.css("background-color","aqua");	
	},500);
}

// Eventos click --------------------------------------

$('#Help').click(function(){
	if(Ayudas>0 && Posiciones.length>0 && segundos>0){
		Ayudas--;
		$('#Help').html("Ayuda "+Ayudas);
		Ayuda();
	}
});

$('#Start').click(function(){
	numClick=0;
	Puntaje=0;
	Juego = [];
	DomPuntos.html(Puntaje);	
	iniciaJuego()
	DomMensajes.html("");
	segundos = 00;
	minutos = 00;
	horas = 00;

});


});

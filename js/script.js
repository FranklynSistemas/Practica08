$(function()
{
	var Puntaje=0, // variable que guardara el puntaje del usuario  
		tiempo = 1000; //Velocidad del reloj en milisegundos
		segundos = 00;
		minutos = 1;
		horas = 1;
		numExitos = 0,
		NumNumeros=121,
		numClick = 0, // Variable que guarda el numero de clicks realizados por el usuario
		Ayudas = 5, //Numero de Ayudas iniciales
		Juego = []; //Guarda toda la matriz del juego

// Inicialización de componentes repetitivos del DOM
	var DomPuntos = $("#Puntos"),
		DomMensajes = $('#Mensajes'),
		DomNum = $("#NumeroaBuscar");
		
//Genera una nueva de grilla de numeros Aleatorios
	function iniciaJuego(){
		Juego = lib.generaGrilla();
		if(Juego[0].length === 12){Juego[0].shift(); DibujaJuego(Juego);}else{DibujaJuego(Juego);};
	}iniciaJuego();

// Función que permite dibujar la cuadricula en el id="Juego" segun la mariz optenida por lib.generaGrilla() del Archivo juego.js
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
          //console.log(oID);
          validaClick(oID,numClick);
	});
}

//Valida si al div que le dan click posee el numero que debe ser dependendo la cantidad de clicks dados
function validaClick(id,click){
 var idSeparado = id.split("_");
	if(Juego[idSeparado[0]][idSeparado[1]].Numero === click){
		numExitos++;
		Juego[idSeparado[0]][idSeparado[1]].Clickeado = true;
		$("#"+id).removeClass("cuadrado ").addClass("Puntaje");
		$("#"+id).html("<div id='Numero'><b>¡10 puntos!<b></div>").fadeOut(800);
		DomPuntos.html(Puntaje+=10);
		if(numClick<NumNumeros){
			DomNum.html(numClick+1);
			if(numExitos===5){Ayudas += 1; numExitos=0; $('#Help').html("Ayuda "+Ayudas);};
		}
		return true;
	}else{
		numClick--;
		return false;
	}

}

// Genera el tiempo para completar el juego y lo muestra en el DOM
var     segundosString = '00',
		minutosString = '00',
		horasString = '00',
		reloj='';
function timer(){
	if(numClick<NumNumeros){	
		if(segundos<60){
			segundosString = segundos<10 ? "0"+segundos++ : segundos++;
		}else if(minutos<60){
			minutosString = minutos<10 ? "0"+minutos++ : minutos++;
			console.log("entre"+minutosString);
			segundos=0;
		}else if(horas<24){
			horasString = horas<10 ? "0"+horas++ : horas++;
			minutos=0;
		}
	}else{
		alertify.alert("<b>Felicitaciones a terminado el juego en: "+horas+":"+minutos+":"+segundos+" y su puntaje fue de: "+Puntaje+"</b>");
	}
	reloj = horasString+":"+minutosString+":"+segundosString;
	$("#Cronometro").html(reloj);
	setTimeout(function(){timer()},tiempo);
}timer();

// Elimina el numero para el que se quiere la ayuda pero le quita -10 putos al jugador
function Ayuda(){
	for (var i = 0; i < Juego.length; i++) {
		for (var j = 0; j < Juego[i].length; j++) {
			if(Juego[i][j].Numero===numClick){
				Juego[i][j].Clickeado = true;
				$("#"+i+"_"+j).removeClass("cuadrado ").addClass("Puntaje");
				$("#"+i+"_"+j).html("<div id='Numero'><b>¡-10 puntos!<b></div>").fadeOut(800);
				DomPuntos.html(Puntaje-=10);
				if(numClick<NumNumeros){
					DomNum.html(numClick+1);
				}
				break;
			}
		};
	};
}
// Eventos click --------------------------------------
$('#Help').click(function(){
	if(Ayudas>0){
		Ayudas--;
		numClick++;
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
// Prohíbe el uso de ctrl + f tomado de http://stackoverflow.com/questions/7091538/is-it-possible-to-disable-ctrl-f-of-find-in-page
window.addEventListener("keydown",function (e) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
        e.preventDefault();
    }
});

});

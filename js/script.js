$(function()
{
	var Dim=0, // Dimensión Inicial del Juego
		Niv=0, // Nivel Inicial del Juego
		Posiciones = [],  // Iniciación del Array de posiciones Aleatorias
		TiempoMax = 1200, // Tiempo máximo para la velocidad en la que aparecerán y desaparecerán los cuadros a adivinar
		Porcentaje = 20,  // Valiable que determina el porcentaje, para la velocidad a la que aparecerán y desaparecerán los cuadros a adivinar
		Puntaje=0, // variable que guardara el puntaje del usuario
		segundos = 60,  //Tiempo límite  para avanzar al siguiente escenario 
		tiempo = 1000; //Velocidad del reloj en milisegundos

	var PosUser  = [], // Iniciación array, guarda las posiciones correctas dadas por el usuario
		numExito = 0, // Variable utilzida para determinar cuantos existos ha tenido el usuario en un escenario
		ganados  = 0, // Variable que determina cuantos escenarios a superado el usuario
		numClick = 0, // Variable que guarda el numero de clicks realizados por el usuario
		numNivel1 = numNivel2 = numNivel3 = 0, // variable que determina el numero de escenario donde se encuentra el usuario
		Ayudas = 5; //Numero de Ayudas iniciales

// Inicialización de componentes repetitivos del DOM
	var DomPuntos = $("#Puntos"),
		DomMensajes = $('#Mensajes'),
		DomNivel = $("#Nivel");

// Función inicial, da comienzo al juego de acuerdo al nivel y dimensión que se desee
	function IniJuego(Dimension , Nivel){
		
		if(Dimension !== 0 && Nivel !== 0){
			Juego = lib.creaJuego(Dimension,Nivel);    		
		}else{
			Juego = lib.creaJuego(3,1);
		}
		 DibujaJuego(Juego);
	}IniJuego(Dim,Niv);
	
// Función que permite dibujar la cuadricula en el id="Juego" segun la mariz optenida por lib.creaJuego() del Archivo juego.js
function DibujaJuego(Juego){
      DomMensajes.html("");
       var tds = `<table id="MyTable">
                    <tbody>`;
    	for (var i = 0; i < Juego.length; i++) {
    		tds += '<tr>';
    		for (var j = 0; j < Juego[i].length; j++) {
    				tds += `<td><div id="${Juego[i][j]}" class="cuadrado"></div></td>`;
    		};
    		tds += `</tr>`;
    	};
    		tds += `</tbody>
              </table>`;
			$("#Juego").html(tds);
// Se asignan los eventos a todos los div de clase .cuadrado			
	$(".cuadrado").click(function() {
          var oID = $(this).attr("id");
          console.log(oID);
          valida(oID);
	});

}

// Funcion que da inicio al juego, mostrando los cuadrados que debera adivinar el usuario
function IniciaJuego(level){
	var cont=0,
		contRemove=0,
		clases = [];

	Posiciones = lib.generaJuego(level);
	console.log(Posiciones);
	
	if(cont < Posiciones.length){
		setInterval(function(){
			clases.push(lib.generaClases());
			$('#'+Posiciones[cont])
				.css("background-color",randomColor())
				.addClass("animated "+clases[cont]);
			cont++;
		if(cont === Posiciones.length && contRemove<Posiciones.length){
			setInterval(function(){
				$('#'+Posiciones[contRemove])
				.removeClass("animated "+clases[contRemove])
				.css("background-color","aqua");
				contRemove++;
			},GeneraTiempo(level));
		}
		},GeneraTiempo(level));
	}
}

// función que permite generar un tiempo, para la velocidad con la que se muestran los cuadrados a adivinar 
function GeneraTiempo(level){
	return TiempoMax - ((TiempoMax * (level*Porcentaje))/100);	
}

// Función que valida cada click que da el usuario en busca de si ha dado click en el cuadrado correcto
function valida(id){
 	if(validaPos(id)!=null && segundos > 0){
 		numClick++;
 		console.log("Numero de Click "+numClick);
 		console.log("Posicion validaPos: "+validaPos(id)+" numClick: "+numClick-1);
 		PosUser.push(id);
 		console.log("Posiciones: "+Posiciones[validaPos(id)]+" PosUser: "+PosUser[numClick-1])
 		
 		if (Posiciones[numClick-1] === PosUser[numClick-1]) {
 			DomPuntos.html(Puntaje+=10);
 			$("#"+id).css("background-color","chartreuse");
 			numExito++;
 		}else{
 			var claseMensaje = lib.generaClases();
 			$("#"+id).css("background-color","red");
 			DomMensajes.html("<p style='color:red'>El Orden es el Incorrecto,  Intente de nuevo</p>").addClass("animated "+claseMensaje);
 			setTimeout(function(){
 					$("#"+id).css("background-color","aqua");
 					DomMensajes.html("").removeClass("animated "+claseMensaje);	
 			},1000);
 			
 			numClick--;
 			PosUser.pop();
 		};
 	}
 	console.log("Numero de Exitos: "+numExito);
 	if( segundos>=0){
	 	if (numExito === Posiciones.length) {
	 		PosUser  = [];
			numExito = 0;
			numClick = 0;
			ganados++;

			for (var i = Posiciones.length - 1; i >= 0; i--) {
				$("#"+Posiciones[i]).css("background-color","aqua");
			};
			console.log("Ha Ganado: "+ganados);
			if (ganados <= 3) {
				DomNivel.html(1+"-"+numNivel1++);
				IniciaJuego(1);
				segundos = 60;
			}else if(ganados > 3 && ganados <= 6){
				DomNivel.html(2+"-"+numNivel2++);
				IniJuego(5,2);
				IniciaJuego(2);
				segundos = 60;
				Ayudas += 2;
				$('#Help').html("Ayudas "+Ayudas);
			}else if(ganados > 6 && ganados <= 10){
				DomNivel.html(3+"-"+numNivel3++);
				IniJuego(7,3);
				IniciaJuego(3);
				segundos = 60;
				Ayudas += 2;
				$('#Help').html("Ayudas "+Ayudas);
			}else if(ganados > 10){
				$("#Juego").html("<p style='color:green'>Felicidades ha ganado todo, para volver a jugar oprima el boton 'Iniciar'</p>")
				.addClass("animated "+generaClases());
				segundos = 61;
			}
	 	}
 	}
 }

/*	Función utilizada para obtener la posición del cuadrado oprimido por el usuario, 
	esto ayudara a saber si se está realizando el juego en el orden correcto
*/
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
	segundos--;
	if(segundos>=0){
		$("#Cronometro").html(00+":"+segundos);
		setTimeout(function(){timer()},tiempo);
	}else{
		segundos < 60 ? DomMensajes.html("<p style='color:red'>Se termino el tiempo, Intente volver a Jugar</p>") : $("#Cronometro").html(00+":"+segundos);
 	
 	}
}
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
	Puntaje=0;
	DomPuntos.html(Puntaje);
	PosUser  = [];
	numExito = 0;
	ganados  = 0;
	numNivel1 = numNivel2 = numNivel3 = 0;
	DomNivel.html(1+"-"+0);
	IniJuego(0,0);
	IniciaJuego(1);
	DomMensajes.html("");
	segundos = 60;
	timer();	

});


});

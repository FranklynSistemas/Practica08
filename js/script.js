$(function()
{
	var Dim=0,
		Niv=0,
		Rango=0,
		Posiciones = [],
		Puntaje=0;


	function IniJuego(Dim , Niv){
		
		if(Dim !== 0 && Niv !== 0){
			Rango = Dim*Dim;
			Juego = lib.creaJuego(Dim,Niv);
    		
 
		}else{
			Rango=9;
			Juego = lib.creaJuego(3,1);
    		//Juego    = newJuego.JuegoInicial;
		}
		 DibujaJuego();
	}IniJuego(0,0);
	


    function DibujaJuego(){
       $('#Mensajes').html("");
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

	$(".cuadrado").click(function() {
          var oID = $(this).attr("id");
          console.log(oID);
          valida(oID);
          //validaFinDeJuego();

	});

    }


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
				//.addClass("animated "+clases[contRemove]);
				contRemove++;
			},GeneraTiempo(level));
		}
		},GeneraTiempo(level));
	}

};

 function GeneraTiempo(level){
	
	return 1100 - (level * 100);
	
}

var PosUser  = [],
	numExito = 0,
	ganados  = 0
	numClick = 0;

 function valida(id){
 	var ev=false;
 	numClick++;
 	console.log("Posiciones del usuario "+PosUser);
 	
 	if(validaPos(id)!=null){
 		console.log("Posicion validaPos: "+validaPos(id)+" numClick: "+numClick-1);
 		PosUser.push(id);
 		console.log("Posiciones: "+Posiciones[validaPos(id)]+" PosUser: "+PosUser[numClick-1])
 		
 		if (Posiciones[numClick-1] === PosUser[numClick-1]) {
 			$("#Puntos").html(Puntaje+=10);
 			$("#"+id).css("background-color","chartreuse");
 			numExito++;
 		}else{
 			var claseMensaje = lib.generaClases();
 			$("#"+id).css("background-color","red");
 			$("#Mensajes").html("<p style='color:red'>El Orden es el Incorrecto,  Intente de nuevo</p>").addClass("animated "+claseMensaje);
 			setTimeout(function(){
 				$("#"+id).css("background-color","aqua");
 				$("#Mensajes").html("").removeClass("animated "+claseMensaje);
 			},1000)
 			
 			numClick--;
 			PosUser.pop();
 		};
 	}

 	console.log("Numero de Exitos: "+numExito);
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
			IniciaJuego(1);
		}else if(ganados > 3 && ganados <= 6){
			$("#Nivel").html(2);
			IniJuego(5,2);
			IniciaJuego(2);
		}else if(ganados > 6 && ganados <= 10){
			$("#Nivel").html(3);
			IniJuego(7,3);
			IniciaJuego(3);
		}else{
			$("#Mensajes").html("<p>Felicidades ha ganado todo, para volver a jugar oprima el boton 'Iniciar'</p>")
			.addClass("animated "+generaClases());
		};

 	};

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

function randomColor()
	{
	   	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
	   	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
	   	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
	};



$('#Start').click(function(){
	Puntaje=0;
	PosUser  = [];
	numExito = 0;
	ganados  = 0;
	$("#Nivel").html(1);
	// Dim 5 level 2
	IniJuego(0,0);
	//Dim 7 level 3
	//IniJuego(7,3)
	IniciaJuego(1);
});


});

#Juego Memory 

Es un juego que tiene como finalidad poner a prueba la agilidad mental del usuario

# Objetivo.

El usuario vera varios cuadros que luego de un tiempo desaparecerán, la idea del juego es adivinar que cuadros desaparecieron en el orden como iban apareciendo.

![Ocupado](https://dl.dropboxusercontent.com/u/96802130/Inicio.gif)

El juego validara que el orden en el que se opriman los cuadros sea el correcto.

![Valida](https://dl.dropboxusercontent.com/u/96802130/Valida.gif)

También se cuenta con un tiempo límite para pasar cada escenario este tiempo es de 60 segundos y una vez que el tiempo se agota el juego termina.

![Tiempo](https://dl.dropboxusercontent.com/u/96802130/Tiempo.gif)

El juego cuenta con 3 niveles, cada uno tiene una velocidad diferente para mostrar los cuadros aleatorios, además por cada nivel el número de cuadros que se muestra varia, en el primer nivel es de 3 el segundo de 5 y el último de 7.

![Niveles](https://dl.dropboxusercontent.com/u/96802130/Niveles.gif)

Para ayudar al usuario a terminar el juego se cuenta con un botón de ayuda el cual al iniciar tiene 5 posibilidades, si se usan estas disminuyen pero si se logra llegar al siguiente nivel estas ayudas aumentan en 2.

![Ayudas](https://dl.dropboxusercontent.com/u/96802130/Ayudas.gif)


# Jugar

http://franklynsistemas.github.io/Practica06/


# Desarrollo

Para la creacion de este juego se hizo uso de JQuery version 2.2, sus funciones fundamentales son las siguientes: 

Inicalización de Variables, Aqui se configura la funcionalidad del juego:

```javascript
    var Dim=0, // Dimensión Inicial del Juego
        Niv=0, // Nivel Inicial del Juego
        Posiciones = [],  // Iniciación del Array de posiciones Aleatorias
        TiempoMax = 1200, // Tiempo máximo para la velocidad en la que aparecerán y desaparecerán los cuadros a adivinar
        Porcentaje = 20,  // Valiable que determina el porcentaje, para la velocidad a la que aparecerán y desaparecerán los cuadros a adivinar
        Puntaje=0, // variable que guardara el puntaje del usuario
        segundos = 60,  //Tiempo límite  para avanzar al siguiente escenario 
        tiempo = 1000; //Velocidad del reloj en milisegundos
        clickInicio = 0;

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

```

Luego se utilizan las funciones que se encuentran en la libreria juego.js https://github.com/FranklynSistemas/Practica06/blob/gh-pages/js/juego.js para generar el juego y sus posiciones aleatorias

```javascript
    
    // Crea una matriz según nivel y tamaño
    function creaJuego(size, level)
    {
        JuegoInicial = [];
        dimension = size !== undefined ? (size < 2 || size > 7 ? 3 : size) : 3;
        nivel = level !== undefined ? (level < 0 || level > 3 ? 1 : level) : 1;
        valMaximo = Math.pow(dimension, 2);
        for(var i = 0; i < dimension; i++)
        {
            JuegoInicial.push([]);
            for(var c = 0; c < dimension; c++)
            {
                JuegoInicial[i].push(i+'_'+c);
            }
        }
        JuegoGlobal = JuegoInicial;
        return JuegoInicial;
    };

```

```javascript
    // Genera las posiciones aleatorias que se mostraran al usuario
    function generaJuego(level){
        var ArrayPos=[];
        usados = [[],[]]; 
        switch(level){
           case 1:
                ArrayPos = aleatorio(dificultad[0]);
           break;
           case 2:
                ArrayPos = aleatorio(dificultad[1]);
           break;
           case 3:
                ArrayPos = aleatorio(dificultad[2]);
           break;
        }

        return ArrayPos;
    }

//Genera un array de posiciones aleatorias dependiendo de la dificulta 3 , 5 , 7 
    function aleatorio(dific){
        var position = ([]);
        for (var i = 0; i < dific; i++) {
            position.push(JuegoGlobal[generAaleatorio(0,JuegoGlobal.length-1,0)][generAaleatorio(0,JuegoGlobal.length-1,1)]);
        };

        
        return position;
    }


```
Luego se da inicio al juego gracias a las funciones que se encuentran en el archivo script.js https://github.com/FranklynSistemas/Practica06/blob/gh-pages/js/script.js , aqui se mencionaran las mas importantes: 

```javascript
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

```


### Autor
Franklyn Lombana Molina

License
----
MIT


#Juego Memory 

Es un juego que tiene como finalidad poner a prueba la agilidad mental del usuario

# Jugar

http://franklynsistemas.github.io/Practica06/

# Objetivo.

El usuario vera varios cuadros que luego de un tiempo desaparecerán, la idea del juego es adivinar que cuadros desaparecieron en el orden como iban apareciendo.

![Ocupado](https://dl.dropboxusercontent.com/u/96802130/Inicio.gif)

El juego validara que el orden en el que se opriman los cuadros sea el correcto.

![Valida](https://dl.dropboxusercontent.com/u/96802130/Valida.gif)

También se cuenta con un tiempo límite para pasar cada escenario este tiempo es de 60 segundos y una vez que el tiempo se agota el juego termina.

![Tiempo](https://dl.dropboxusercontent.com/u/96802130/Tiempo.gif)

El juego cuenta con 3 niveles, cada uno tiene una velocidad diferente para mostrar los cuadros aleatorios, además que por cada nivel el número de cuadros que se muestra varia, en el primer nivel es de 3 el segundo de 5 y el último de 7.

![Niveles](https://dl.dropboxusercontent.com/u/96802130/Niveles.gif)

Para ayudar al usuario a terminar el juego se cuenta con un botón de ayuda el cual al iniciar tiene 5 posibilidades si se usan estas disminuyen pero si se logra llegar al siguiente nivel estas ayudas aumentan en 2.

![Ayudas](https://dl.dropboxusercontent.com/u/96802130/Ayudas.gif)




# Desarrollo

Para la creacion de este juego se hizo uso de JQuery version 2.2, sus funciones fundamentales son las siguientes: 

```javascript
    
    // Crea una matriz segun nivel y tamaño
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


### Autor
Franklyn Lombana Molina

License
----
MIT


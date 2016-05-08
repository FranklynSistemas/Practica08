#Juego 1-121

Es un juego que tiene como finalidad poner a prueba la agilidad mental del usuario

# Objetivo.

El usuario vera varios numeros en pantalla y un objetivo a buscar inicialmente el 1 y asi debera conseguir los numeros
en orden hasta llegar al 121, su meta sera realizarlo cada vez mas rapido y sin usar las ayudas.

Por cada numero encontrado se dan 10 puntos y si se usa una ayuda se pierden 10 puntos. 

Si se tiene una racha de 5 numeros encontrados el juego regala una ayuda más.


# Jugar

http://franklynsistemas.github.io/Practica08/


# Desarrollo

Sus funciones fundamentales son las siguientes: 

Inicalización de Variables, Aqui se configura la funcionalidad del juego:

```javascript
        Numeros = [], //Guardara un array de numeros de 1 a 121 de forma aleatoria
        NumNumeros = 121, //Cantidad de numeros a generar
        NumGrilla = 11, // Cantidad de numeros por columna
        Grilla = [], // Guardara cada gilla de 11
        usados = [], // Almacena los numeros que ya se han asignado para no repetir numeros
        Matriz = []; // Guarda toda las grillas generadas de a 11 en una sola Matriz

```

Funciones principales: 

```javascript
//la funcion GeneraNumeros crea el array con los numeros del 1 al 121 de forma aleatoria   
    function GeneraNumeros(){
        var cont = 0;
        do{
            if(cont<NumNumeros){
                var random = generAaleatorio(1,NumNumeros);
                Numeros.push(random);
                cont++; 
            }else{
                break;
            }
        }while(1);
    };
//La funcion generaGrilla recorre el array de numeros y lo va separando en 11 partes
    function generaGrilla(){
        usados = [];
        Matriz = [];
        Numeros = [];
        GeneraNumeros();
        var cont = 0;
        for (var i = 0; i <= NumNumeros; i++) {
            cont++;
            if(cont>=NumGrilla){
                cont=0;
                Grilla.push({   Numero: Numeros[i],
                                Clase: "animated "+generaClases(),
                                Clickeado: false,
                                Color: randomColor()
                            });
                Matriz.push(Grilla);
                Grilla = [];
            }else{
                Grilla.push({   Numero: Numeros[i],
                                Clase: "animated "+generaClases(),
                                Clickeado: false,
                                Color: randomColor()
                            });
            }
        };
        return ordenaIds(Matriz);
    };

// la funcion ordenaIds genera los ids propios de cada posicion de los numeros dentro de la Matriz esto para luego acceder a ellos
function ordenaIds(Mz){
    var MatrizOrdenada = Mz;
    for (var i = 0; i < Mz.length; i++) {
        for (var j = 0; j < Mz[i].length; j++) {
            MatrizOrdenada[i][j].Id = i+"_"+j;
        };   
    };
    return MatrizOrdenada;
}

```

### Autor
Franklyn Lombana Molina

License
----
MIT


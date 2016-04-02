var lib = function() {
   
    var JuegoInicial    = [],
        dificultad      = [3, 5, 7],
        dimension       = 0,
        nivel           = 0,
        valMaximo       = 0;

    var JuegoGlobal = [];
    usados = [[],[]]; 

    var clasesAnimate = ["bounce","flash","pulse","rubberBand","shake","swing","tada","wobble","jello"];

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

    function aleatorio(dific){
        var position = ([]);
        for (var i = 0; i < dific; i++) {
            position.push(JuegoGlobal[generAaleatorio(0,JuegoGlobal.length-1,0)][generAaleatorio(0,JuegoGlobal.length-1,1)]);
            //console.log(position);
        };

        
        return position;
    }

//from http://www.codigoactionscript.org/obtener-un-numero-aleatorio-sin-que-se-repita/#sthash.Gqj1Bbzn.dpuf    

 
function generAaleatorio(min, max, indice)
{ 

    if (usados[indice].length != (max - min)) { 
        var num;
        var repe = false; 
        do { 
            num = Math.floor(Math.random() * (max - min + 1)) + min; 
            repe = repetido(num,indice); 
        } while (repe != false); 
            usados[indice].push(num); 
        return num; 
    } else { 
        return 0;
    } 
}  

function repetido(num, indice) {
 var repe = false; 
 for (var i = 0; i < usados.length; i++) { 
    if (num == usados[indice][i]) {
     repe = true; 
    } 
 } 
 return repe; 
} 

function generaClases(){
    return clasesAnimate[Math.floor(Math.random() * ((clasesAnimate.length-1) - 0 + 1)) + 0]
}


    return {
        creaJuego : creaJuego,
        generaJuego: generaJuego,
        generaClases: generaClases
    }
}();

var Xray = require('x-ray');
var x = Xray();
var $ = require('jquery');
var axios = require('axios');



var contador = 1;
var tEnv = "";
var uEnv = "";
var iEnv = "";
setTimeout(visitarUrl, 100);
var inicio = 0;
var url;

function visitarUrl(){
    x('http://www.dblatino.com/dbsuper/', 'body',[{
        url: ['.capitulostitle a@href']
    }])(function(eer, r){
        url = r[0].url[inicio];
        /*$m = r[0].url[inicio];
        $resultado = $m.indexOf("-", 0)+2;
        tEnv = $m.slice($resultado, $resultado + 95);
        //setTimeout(buscarCapitulo, 2000);*/
        inicio++;
        setTimeout(buscarCapitulo, 3000);
        
    })
}
var url2;
function buscarCapitulo(){
    x(url, 'iframe@src')(function (eer, r) {
      url2 = r;
    })
    setTimeout(visitarIframe, 2000);
}

function visitarIframe(){
    console.log(url2);
    x(url2, '.video-js@poster')(function(error, res){
        console.log("--->"+res);
        iEnv = res;
    })
    setTimeout(crearCapitulo, 3000);
}

function crearCapitulo(){
    axios.get('http://api.trucosdeactualidad.com/dbs/llenarDbs.php?id='+inicio+'&img='+iEnv).then(function(res){
        console.log(res);
        setTimeout(visitarUrl, 1000);
    }).catch(function (error) {
        console.log(error);
    });
}
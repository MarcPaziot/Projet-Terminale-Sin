var http=require('http');
var fs=require('fs');

//login et passwd websocket
var login="user";
var passwd="pwd";


//===============================================================
//websocket :
//Chargement du ficher essai/html affiché au client
var server=http.createServer(function(req, res){
        fs.readFile('essai.html','utf-8', function (error, content){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content);
        });
});

//chargement de socket.io
var io=require('socket.io').listen(server);
io.sockets.on('connection', function (socket, pseudo){
        //Des qu'on nous donne un pseudo, on le stoque en variable de session
        socket.on('connection', function(pseudo){
                socket.pseudo=pseudo;
                console.log(socket.id+'vient de se connecter');
        });

        //Des qu'on reçoit un "login"
        socket.on('login', function(message){
                console.log(socket.id+'se log'+'message');
                var test=login+":"+passwd;
                if (message==test){
                        socket.pseudo=login;
                        console.log("login correct");
                        console.log("socket.emit('message', 'vous êtes bien connecté')");
                        //on signale aux autres clients qu'il y a un nouveau venu
                        socket.broadcast.emit('message', 'Un autre client vient de se connecter !')
                        var fs=require("fs");
                        var contenu=fs.readFileSync("page2.html", "UTF-8");
                        socket.emit('principal', contenu);
                }
            	else {
            		function mauvaisMDP{
            			confirm("Mauvais login ou/et mot de passe");
            		}
            	}
        });

        socket.on('BP', function (message){
                /*
                if (message!=0){
				var test=parseInt(valeur)&parseInt(mesage);
                console.log(test);
                if (test==0){
                valeur+=message;
                console.log(valeur);
                }
                else valeur-=message;
                //valeur&=255;
                }
                console.log(socket.id+'appuie sur un BP'+message+":"+valeur);
                socket.emit('led', valeur);
                */
                var test=parseInt(message);
                if (test!=0){
                        wsTcp=test;
                        //console.log(wsTcp);
                }
        });

})


server.listen(8088);

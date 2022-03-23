(function(){
    var app = angular.module("ChatApp", []);

    /*
    VERSION DE CLIENT.JS UNIDA A ANGULAR

    var sala;
         
    
    
    function selectS(x){
        //console.log(number)
        //sala = document.querySelector("#sala").value;
        console.log("SALA"+x)
        //console.log(sala);
        //;

        
        
        sala = x;
        window.location.href = "http://localhost:3000/chat/s"+sala;
        sockets();
    };
    
    
    function sockets(){
    console.log("SCOEKTS")
    //get elements
    var Mstatus = element('status');
    var messages = element('messages');
    var username = element('username');
    var textarea = element('textarea');
    var clearBtn = element('clear');
    var date = new Date();
    if(!(Mstatus == undefined|| messages == undefined || username == undefined || textarea == undefined || clearBtn == undefined)){
        //set default status 
        var statusDefault = Mstatus.textContent;
        var setStatus = function(s){
            //set status
            Mstatus.textContent = s;
    
            if(s != statusDefault){
                var delay = setTimeout(function(){
                    setStatus(statusDefault);
                }, 4000);
            }
        }
    }
        var socket = io.connect('http://localhost:3000', {query: 'num='+sala});;
        console.log('Connected to socket...')
     // Hande output
     socket.on('output', function(data){
        data.forEach(element => {
            var message = document.createElement('div');
            message.setAttribute('class', 'chat-message');

            var text = document.createElement('div');
            text.setAttribute('class', 'chat-text');

            var time = document.createElement('div');
            time.setAttribute('class', 'chat-time');

            var name = document.createElement('div');
            name.setAttribute('class', 'chat-name');

            var minuto = element.fecha.hora.minuto;
            switch(minuto){
                case 0:
                    minuto = '00';
                    break;
                case 1:
                    minuto = '01';
                    break;
                case 2:
                    minuto = '02';
                    break;    
                case 3:
                    minuto = '03';
                    break;
                case 4:
                    minuto = '04';
                    break;
                case 5:
                    minuto = '05';
                    break;
                case 6:
                    minuto = '06';
                    break;
                case 7:
                    minuto = '07';
                    break;
                case 8:
                    minuto = '08';
                    break;    
                case 9:
                    minuto = '09';
                    break;
                }
            text.textContent = element.mensaje;
            time.textContent = element.fecha.hora.hora+":"+minuto;
            name.textContent = element.nombre;
            
            message.appendChild(name);
            message.appendChild(text);
            message.appendChild(time);
            message.insertBefore(text, name);
            message.insertBefore(text, time);
            
            messages.appendChild(message);
        });
    });

    // Get Status from Server
    socket.on('status', function(data){
        //get message status
        setStatus((typeof data === 'object')?data.message : data);

        //if status is clear, clear text
        if(data.clear){
            textarea.value = '';
        }
    });

    //Clear Message
    socket.on('cleared', function(){
        messages.textContent = '';
    });

    if (socket != undefined){
         // Hande input 
         textarea.addEventListener('keydown', function(){
            if(event.which === 13 && event.shiftKey == false){
                // emit to server input
                socket.emit('input', {
                    nombre: username.value,
                    mensaje: textarea.value,
                    dia: date.getDate(),
                    mes: date.getMonth() + 1,
                    year: date.getFullYear(),
                    hora: date.getHours(),
                    minuto: date.getMinutes(),
                    segundo: date.getSeconds()
                });
                event.preventDefault();
            }
        });

        // Handle Chat Clear
        clearBtn.addEventListener('click', function(){
            socket.emit('clear');
        });
    }
    }
    //check for connection
    
     var element = function(id){
        return document.getElementById(id);
    }
    */
    app.controller("ChatCtrl", function($scope, $http, $window){
        $scope.salas = [];
        $scope.salasUq = [];
        $scope.chat = [];
        $scope.saludo = "Sala de Chats";
        $scope.envio = 0;
        $scope.sala;

        $scope.getSalas = function(){
            $http.get("/chats/room")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("An error has occurred...");
                    }else{
                        $scope.salas = respuesta.data;
                        var aux = [];
                        for (var i = 0; i < $scope.salas.length; i++){
                            aux[i] = $scope.salas[i].sala;
                        }
                        const dataArr = new Set(aux);

                        $scope.salasUq = [...dataArr];
                        
                    }
                 });
        }

        $scope.selectSala = function(num){
            $scope.sala = $scope.salasUq[num];
            $window.location.href = '/chat/s'+$scope.sala;
        }

        $scope.envioArchivo = function(){
            $scope.envio = ( $scope.envio == 1 ) ? 0 : 1;
        }

        $scope.getSalas();
    });
})();
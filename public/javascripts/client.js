var element = function(id){
    return document.getElementById(id);
}
    
//get elements
var Mstatus = element('status');
var messages = element('messages');
var username = element('username');
var textarea = element('textarea');
var date = new Date();
var room = element('sala');
var sala;
var select = element('slct');
var aux = element('sala');

var uploadB = element('UploadButton'); 
var fileB = element('FileBox'); 
var dataN = element('NameBox'); 

var datos = element('datos');
    
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
/*
uploadB.addEventListener('click', StartUpload);
fileB.addEventListener('change', FileChosen);
var SelectedFile;
function FileChosen(evnt){
    SelectedFile = evnt.target.files[0];
    dataN.value = SelectedFile.name;
}

var FReader;
var Name;
function StartUpload(){
    if(fileB.value != ""){
        FReader = new FileReader();
        Name = dataN.value;
        var Content = "<span id='NameArea'>Uploading " + SelectedFile.name + " as " + Name + "</span>";
        Content += '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
        Content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round(SelectedFile.size / 1048576) + "MB</span>";
        document.getElementById('UploadArea').innerHTML = Content;
        FReader.onload = function(evnt){
            socket.emit('Upload', {'Name': Name, Data: evnt.target.result});
        }
        socket.emit('Start', {'Name':Name, 'Size':SelectedFile.size});
    }
}function selectFile(e){
    setFile(e.target.files[0]);
}
*/


//connect to socket.io
var socket = io.connect('http://localhost:3000', {query: 'num='+datos.value});

    //check for connection
if (socket != undefined){

    console.log('Connected to socket...')
    
    // Hande output
    socket.on('output', function(data){
        data.forEach(element => {
            if (element.sala == datos.value){
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

                messages.scrollTop = messages.scrollHeight;
            }
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
                segundo: date.getSeconds(),
                sala: datos.value
            });
            event.preventDefault();
        }
    });

    //Clear Message
    socket.on('cleared', function(){
        messages.textContent = '';
    });
} 
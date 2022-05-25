function encontrarSala(id){
    var xmlGET = new XMLHttpRequest();
    xmlGET.open('GET', '/chats/id'+id, true)
    xmlGET.onreadystatechange = function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            console.log(xmlGET.response)
        }
    }
}

function extraerID(callback){
    var id = document.getElementById("contenedor");
    callback(id.value);
}


    var button = document.getElementById("buttona");
    button.addEventListener("click", extraerID(encontrarSala), true);


import Global from "./../Global";
import axios from "axios";

export default class EventoService{

    getAllEventos(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/eventos";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    getByIdEventos(id){
        return new Promise(function(resolve) {
            var request = Global.url + "api/eventos/" + id;

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    updateEvento(evento){
        return new Promise(function(resolve){
            var request = Global.url + "api/eventos";

            axios.put(request, evento).then(() => {
                resolve();
            });
        });
    }
    
}
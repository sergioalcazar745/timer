import Global from "./../Global";
import axios from "axios";

export default class SalaService{

    getAllSalas(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/Salas";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    deleteSala(id){
        return new Promise(function(resolve){
            var request = Global.url + "api/Salas/" + id;

            axios.delete(request).then(() => {
                resolve();
            });
        });
    }

    postSala(nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/salas/createsala/" + nombre;

            axios.post(request).then(() => {
                resolve();
            });
        });
    }

    updateSala(id, nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/salas/updatesala/" + id + "/" + nombre;
            console.log(request)

            axios.put(request).then(() => {
                resolve();
            });
        });
    }

}
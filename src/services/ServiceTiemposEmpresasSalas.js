import Global from "./../Global";
import axios from "axios";

export default class ServiceTiemposEmpresasSalas{

    getAllTiemposEmpresasSalas(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/tiempoempresasala";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    getByIdTiemposEmpresasSalas(id){
        return new Promise(function(resolve) {
            var request = Global.url + "api/tiempoempresasala/" + id;

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    postTiemposEmpresasSalas(tiempoempresasala){
        return new Promise(function(resolve) {
            var request = Global.url + "api/tiempoempresasala";

            axios.post(request, tiempoempresasala).then(response => {
                resolve(response.data)
            });
        });
    }

    putTiemposEmpresasSalas(tiempoempresasala){
        return new Promise(function(resolve) {
            var request = Global.url + "api/tiempoempresasala";

            axios.post(request, tiempoempresasala).then(response => {
                resolve(response.data)
            });
        });
    }
    
}
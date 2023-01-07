import Global from "./../Global";
import axios from "axios";

export default class ServiceTiemposEventos{

    getAllTiemposEventos(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/timereventos";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }    
}
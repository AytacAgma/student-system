import axios from "axios";

export default class TownService{
    getTowns(cityId){
        return axios.get("http://localhost:8080/api/towns/"+cityId)
    }
}
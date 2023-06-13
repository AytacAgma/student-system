import axios from "axios";

export default class StudentService{
    getStudents(){
        return axios.get("http://localhost:8080/api/students/getall")
    }

    addStudent(nationalId, name, telephone, townId){
        return axios.post("http://localhost:8080/api/students?nationalId="+nationalId+"&name="+name+"&telephone="+telephone+"&town="+townId)
    }

    removeStudent(nationalId){
        return axios.delete("http://localhost:8080/api/students/"+nationalId)
    }
}
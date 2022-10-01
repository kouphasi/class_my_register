const axios = require("axios").create()

export const login_check = async function(obj){
    try {
        const response = await axios.post("/api/logincheck",obj)
        return {...response.data, error: false}
    } catch(e) {
        console.log(e)
        return {error: true}
    }
}
export const check_api = async function(){
    const response = await axios.get("/api/message")
    console.log(response.data)
}

export const entry = async function(obj){
    try {
        const response =await axios.post("/api/apis",obj)
        return {...response.data, error: false}
    } catch (e){
        console.log(e)
        return {error: true}
    }
}
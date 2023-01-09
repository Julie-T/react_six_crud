import axios from "axios";

const baseUrl = 'http://localhost:7777/notes'


const createNote = (obj) => {
    return axios.post(baseUrl, obj).then(response => response.status)
}

const getNotes = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deleteNote = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.status)
}

const crud = {
    getNotes,
    createNote,
    deleteNote
}

export default crud
import { create } from "zustand"
import axios from "axios"

export const typeSociosStore = create((set, get) => ({
    typeSocios: [],
    getTypeSocios : async ()=> {
        const response = await axios("http://localhost:8080/categorias")
        const typeSocios = await response.data
        
        // console.log("----------CATEGORIAS---------")
        // console.log(typeSocios)
        // console.log("-----------------------------")

        set(state => ({
            typeSocios
        }))
    },
    getTypeSocioById : (id)=>{
        return get().typeSocios.find(type => type.id === id)
    }
}))
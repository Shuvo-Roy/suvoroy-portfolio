"use server"

import { redirect } from "next/navigation"

export const searchAction = async(formData:FormData)=>{
    const searchTxt=formData.get("search")
    if(typeof searchTxt !=="string" || !searchTxt){
        redirect("/")
    }

    redirect(`/articles?search=${searchTxt}`)
}
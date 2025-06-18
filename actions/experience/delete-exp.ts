"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteExp = async (experienceId:string)=>{
    await prisma.experience.delete({
        where:{ id:experienceId}
    })
    revalidatePath("/dashboard/experience")
}
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteProject = async (projectId:string)=>{
    await prisma.project.delete({
        where:{ id:projectId}
    })
    revalidatePath("/dashboard")
}
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteEdu = async (educationId:string)=>{
    await prisma.education.delete({
        where:{ id:educationId}
    })
    revalidatePath("/dashboard/educations")
}
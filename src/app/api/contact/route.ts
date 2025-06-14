import { NextResponse } from "next/server"

interface ContactRequest{
    name: string;
    email: string;
    message: string;
}
export async function POST(request: Request) {
    try {
        const body = await request.json() as ContactRequest;
        console.log(body);
        return NextResponse.json({message: "Message sent Successfully"},{status:200})
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: "Failed to send message"
        return NextResponse.json({
            message:errorMessage
        },{
            status:500
        })
    }
}
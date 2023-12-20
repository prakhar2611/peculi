import { getCookies } from "cookies-next";

export async function GET(request, { params }) {
 const cookies = getCookies()
    return Response.json({ 'Cookies :' : cookies});

   
}


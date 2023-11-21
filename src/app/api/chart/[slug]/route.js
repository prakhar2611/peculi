import { getMonthlyData, getVpaData } from "../apiHelper";
export async function GET(request, { params }) {

  const slug = params.slug
  const token = request.headers.get("token")

  let response = null
  switch (slug) {
    case 'getmonthlydata':
         response= await getMonthlyData(token)   
        return Response.json({data : response});
        break;
        case 'getvpadata':
          const { searchParams } = new URL(request.url)
          const month = searchParams.get('month')
           
             response = await getVpaData(token,month)   

            return Response.json({data : response});
            break;
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
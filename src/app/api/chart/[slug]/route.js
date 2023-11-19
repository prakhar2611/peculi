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
            const month = 'Nov'
            console.log("current month data requested for : ", month )
             response = await getVpaData(token,month)   

            return Response.json({data : response});
            break;
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
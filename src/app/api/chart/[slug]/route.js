import { getMonthlyData } from "../apiHelper";
export async function GET(request, { params }) {

  const slug = params.slug
  switch (slug) {
    case 'getmonthlydata':
        const response= await getMonthlyData()
        
        return Response.json({data : response});
        break;
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
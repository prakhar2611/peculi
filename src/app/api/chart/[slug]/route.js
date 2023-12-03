import { getMonthlyData, getNonLabeledVpaData, getRecentTransaction, getUniqueVpa, getVpaData } from "../apiHelper";
export async function GET(request, { params }) {

  const slug = params.slug
  const token = request.headers.get("token")
  const { searchParams } = new URL(request.url)
  var month = ""

  let response = null
  switch (slug) {
    case 'getmonthlydata':
         response= await getMonthlyData(token)   
        return Response.json({data : response});
        break;
    case 'getvpadata':
         month = searchParams.get('month')
        response = await getVpaData(token,month)   
        return Response.json({data : response});
        break;

    case 'getNonLabeledvpadata':
         month = searchParams.get('month')
        response = await getNonLabeledVpaData(token,month)   
        return Response.json({data : response});
        break;    
    case 'getUniqueVpa':
      response = await getUniqueVpa(token)   
      return Response.json({data : response});
      break;     
      
    case "getRecentTransaction" : 
    month = searchParams.get('month')
    console.log("Inside get recent trxn")
      response = await getRecentTransaction(token,month)   
      return Response.json({data : response});
      break;     
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
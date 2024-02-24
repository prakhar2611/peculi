import { getMonthlyData, getNonLabeledVpaData, getRecentTransaction, getUniqueVpa, getVpaData } from "../apiHelper";
export async function GET(request, { params }) {

  const slug = params.slug
  const token = request.headers.get("token")
  const { searchParams } = new URL(request.url)
  var date = ""
  var bank  = ""
  console.log("token in the server " , token )


  let response = null
  switch (slug) {
    case 'getmonthlydata':
         response= await getMonthlyData(token)   
        return Response.json({data : response});
        break;
    case 'getvpadata':
         date = searchParams.get('date')
          bank = searchParams.get('bank')
        response = await getVpaData(token,date,bank)   
        return Response.json({data : response});
        break;

    case 'getNonLabeledvpadata':
      date = searchParams.get('date')
         bank = searchParams.get('bank')

        response = await getNonLabeledVpaData(token,date,bank)   
        return Response.json({data : response});
        break;    
    case 'getUniqueVpa':
      response = await getUniqueVpa(token)   
      return Response.json({data : response});
      break;     
      
    case "getRecentTransaction" : 
    date = searchParams.get('month')
    console.log("Inside get recent trxn")
      response = await getRecentTransaction(token,date)   
      return Response.json({data : response});
      break;     
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
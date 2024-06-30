import {getTableData, getMonthlyData, getNonLabeledVpaData, getRecentTransaction, getUniqueVpa, getVpaData, listSchemas, getQueryData } from "../apiHelper";
export async function GET(request, { params }) {

  const slug = params.slug
  const token = request.headers.get("token")
  const { searchParams } = new URL(request.url)
  var date = ""
  var bank  = ""
  var table = ""
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
    date = searchParams.get('date')
    console.log("Inside get recent trxn")
      response = await getRecentTransaction(token,date)   
      return Response.json({data : response});
      break;     
    case "getDataSchema" :
      response = await listSchemas()
      return Response.json(response)
    case "getTableData" :
        table = searchParams.get('table')
        response = await getTableData(table)
        return Response.json(response)
    case "getQueryData" :
      table = searchParams.get('query')
      response = await getQueryData(table)
      return Response.json(response)
    default :
    return Response.json({ error: 'Endpoint not found' });

   
}

}
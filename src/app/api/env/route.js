export async function GET(request, { params }) {
  console.log('Environment Variables:', process.env);

    return Response.json({ 'Environment Variables:' : process.env});

   
}


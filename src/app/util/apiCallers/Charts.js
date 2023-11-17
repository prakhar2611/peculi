export function getMonthlyChartData(token){
 
         return      axios.get(`localhost:3000/api/v1/getVpaLabelPocketMapping`,{
              headers: {           
                  'Content-Type': 'application/json',
                  'token' :  token
              },        
          })
          .then(response => response.data
          )
              .catch(error => console.error(error));
   
  }
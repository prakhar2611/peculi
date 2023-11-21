import axios from 'axios'

export function getMonthlyChartData(token){
 
         return    axios.get(`http://localhost:3000/api/chart/getmonthlydata`,{
              headers: {           
                  'Content-Type': 'application/json',
                  'token' :  token
              },        
          })
          .then(response => response.data
          )
              .catch(error => console.error(error));
   
  }



  export function getVpaChartData(token,currentMonth){
    console.log("vpa data requested for" ,currentMonth)
    return    axios.get(`http://localhost:3000/api/chart/getvpadata?month=${currentMonth}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 
import axios from 'axios'

export const inappserver = "http://localhost:3000/"

export function getMonthlyChartData(token){
 
         return    axios.get(inappserver+`api/chart/getmonthlydata`,{
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
    
    return    axios.get(inappserver+`api/chart/getvpadata?month=${currentMonth}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

export function getNonLabeledVpaChartData(token,currentMonth){
    console.log("vpa data requested for" ,currentMonth)
    
    return    axios.get(inappserver+`api/chart/getNonLabeledvpadata?month=${currentMonth}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

export function getUniqueVpaData(token){
    
    return    axios.get(inappserver+`api/chart/getUniqueVpa`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

export function getRecentTransactionData(token,currentMonth){
    
    return    axios.get(inappserver+`api/chart/getRecentTransaction?month=${currentMonth}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

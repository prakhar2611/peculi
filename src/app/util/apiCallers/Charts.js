import axios from 'axios'

export const inappserver  = process.env.NEXT_PUBLIC_APP

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



  export function getVpaChartData(token,currentMonth,currentBank){
    
    return    axios.get(inappserver+`api/chart/getvpadata?date=${currentMonth}&bank=${currentBank}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

export function getNonLabeledVpaChartData(token,currentMonth,Bank){
    
    return    axios.get(inappserver+`api/chart/getNonLabeledvpadata?date=${currentMonth}&bank=${Bank}`,{
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
    
    return    axios.get(inappserver+`api/chart/getRecentTransaction?date=${currentMonth}`,{
         headers: {           
             'Content-Type': 'application/json',
             'token' :  token
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 


export function getDataSchema(){
    
    return    axios.get(inappserver+`api/chart/getDataSchema`,{
         headers: {           
             'Content-Type': 'application/json',
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 


export function getTableData(tableName){
    
    return    axios.get(inappserver+`api/chart/getTableData?table=${tableName}`,{
         headers: {           
             'Content-Type': 'application/json',
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 

export function getQueryData(query){
    
    return    axios.get(inappserver+`api/chart/getQueryData?query=${query}`,{
         headers: {           
             'Content-Type': 'application/json',
         },        
     })
     .then(response => response.data
     )
         .catch(error => console.error(error));

} 
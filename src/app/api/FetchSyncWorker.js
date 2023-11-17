
import axios from 'axios'

const serverurl = 'http://localhost:9005/'



export function SyncWorker (token,from,to,label)  {

        console.log("Request payload for Syncing data : ", `http://192.168.1.5:9005/SyncMail?label=${label}&to=${to}&from=${from}` )
        const URL = serverurl+`SyncMail?label=${label}&to=${to}&from=${from}`;

        return axios(URL, {
            method: 'GET',
            headers: {
              'content-type': 'application/json', 
              'token' :  token
            },
          })
            .then(response => response.data)
            .catch(error => {
              throw error;
            });
}   

export function FetchWorker(token,from,to,label,callback, errorcallback){
    console.log("Request payload for fetching the data : ", `http://192.168.1.5:9005/expense/api/v1/getExpense?from=${from}&to=${to}&label=${label}` )

    const URL = serverurl+`expense/api/v1/getExpense?from=${from}&to=${to}&label=${label}`;
    return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', 
      'token' :  token
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });

}

export function UpdateVPAMapping(p,token){
  console.log("update payload :",p);
  return axios.post(serverurl+'expense/api/v1/UpdateVpaMapping', JSON.stringify(p),{
      headers: {
          'Content-Type': 'application/json',
          'token' :  token
       },
  }).then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });     
}

export function FetchGroupedVPA(limit,offset,token,type="CONFIGURE"){
 
  console.log("Request payload for fetching the data : ", +`http://localhost:9005/expense/api/v1/getXpnsByVpa` )


       return      axios.get(serverurl+`expense/api/v1/getXpnsByVpa?type=${type}&label=HDFC&limit=${limit}&offset=${offset}`,{
            headers: {           
                'Content-Type': 'application/json',
                'token' :  token
            },        
        })
        .then(response => response.data
        )
            .catch(error => console.error(error));
 
}

export function FetchVPALabelPocketMap(token){
 
  console.log("Request payload for fetching the data : ", +`http://localhost:9005/expense/api/v1/getVpaLabelPocketMapping` )


       return      axios.get(serverurl+`expense/api/v1/getVpaLabelPocketMapping`,{
            headers: {           
                'Content-Type': 'application/json',
                'token' :  token
            },        
        })
        .then(response => response.data
        )
            .catch(error => console.error(error));
 
}


export function UpdatePocketsMapping(p,token){
  Object.keys(p).map((key) => {
    p[key] = Array.from(p[key])
  })

  const payload = {
    data : p
  }
  console.log("update payload :",JSON.stringify(payload));

  return axios.post(serverurl+'expense/api/v1/UpdatePockets', JSON.stringify(payload),{
      headers: {
          'Content-Type': 'application/json',
          'token' :  token
       },
  }).then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });     
}

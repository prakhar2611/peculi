import axios from "axios";
import { inappserver } from "./Charts";
import { serverurl } from "./FetchSyncWorker";



export function signIn() {
  const serverurl = process.env.REACT_APP_GOOGLE_CALLBACK_URL


    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '64464811543-fee5m8plhj94lpv9vgcei91r15189b45.apps.googleusercontent.com',
                'redirect_uri': inappserver+'/auth/callback?provider=google',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
  };


  export function getuserDetails() {

    return(
      axios.get(serverurl+`api/User/v1/GetUserProfile`,{
            headers: {           
                'Content-Type': 'application/json',
                'token' :  token
            },        
        })
        .then(response => response.data)
        .catch(error => {return console.error(error)}))
  }


  export async function getUserInfo(token) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;
    
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data; // Returns the user object
        } else {
            // Handle non-200 responses if needed
        }
    } catch (err) {
        console.error('Error fetching user info:', err.message);
    }

    return null; // Return null in case of error or non-200 response
}
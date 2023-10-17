import axios from "axios";
const token = sessionStorage.getItem('access_token');


export function SignIn() {
  const serverurl = process.env.REACT_APP_GOOGLE_CALLBACK_URL


    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '64464811543-fee5m8plhj94lpv9vgcei91r15189b45.apps.googleusercontent.com',
                'redirect_uri': 'http://localhost:3000/auth/callback?provider=google',
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
    const serverurl = process.env.REACT_APP_SERVER_URL

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
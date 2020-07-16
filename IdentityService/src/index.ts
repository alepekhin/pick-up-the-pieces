import { app } from './provider';
import axios from "axios";

const port = process.env.PORT;
const uri = process.env.OIDC_BASE_URI

const sss = {
  "client_id":"foo4",
  "redirect_uris":["http://localhost:3000"]
  }

// start the Express server
app.listen( port, () => {
  console.log(`oidc-provider listening on port ${port}, check ${uri}/.well-known/openid-configuration`);
} );

axios({
  method: 'post',
  url: 'http://localhost:4000/oidc/reg',
  headers: {'accept': 'application/json','content-type': 'application/json'},
  data: {
    client_id: 'foo4',
    redirect_uris: ['http://localhost:3000/oauth/callback']
  }
})
.then(function (response) {
  console.log('axios response '+JSON.stringify(response.data))
  console.log('client_id '+response.data.client_id)
  console.log('client_secret '+response.data.client_secret)
})
.catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
});
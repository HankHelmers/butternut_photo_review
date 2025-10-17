// import { GoogleAuth } from '/google-auth-library';
// import { google } from '/googleapis';
import { clientId, key } from './secrets.js'

// ${{ secrets.GOOGLEDRIVEAPI_CLIENTID}}


// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = clientId;
const API_KEY = key;
const REDIRECT_URI = "http://localhost:5500/public"

// reference for setting scopes: https://developers.google.com/workspace/drive/api/guides/api-specific-auth#node.js
// scopes set in configuration: .../auth/drive.readonly	.../auth/drive.metadata
const scopes = [
    "https://www.googleapis.com/auth/drive.apps.readonly",
    "https://www.googleapis.com/auth/drive.metadata"
]; 

async function authenticate() {
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: scopes.join(" "),    // standard to join multiple with spaces
        callback: (tokenResponse) => {
            // Save token for later use
            window.accessToken = tokenResponse.access_token;
            console.log("Access token:", window.accessToken);
        },
    });

    tokenClient.requestAccessToken();
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 * Reference: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#authorization-errors-origin-mismatch
 */
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'response_type': 'token',
        'scope': scopes.join(" "),    // standard to join multiple with spaces
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };

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
}

async function getAllFiles() {
    const response = await fetch("https://www.googleapis.com/drive/v3/files", {
        headers: {
            "Authorization": `Bearer ${window.accessToken}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
}


window.addEventListener("load", (event) => {
    // console.log(clientId);
    oauthSignIn();
    // getAllFiles();
});
# SubitoLogin
## About
The SubitoLogin software is used in the website https://santosubito.xyz/ for authentication and managing access to different services offered by the website.
The SubitoLogin service offers reliable and secure access to all services locked behind passwords on the https://santosubito.xyz/ website.
## API
The SubitoLogin service offers a REST api for interacting with the accounts database. 
The API is accessible using an API key sey in the Constants.js file located in the config folder in the root of the project.
Right now the API has only two useful calls: the `getuser` call and the `newuser` call.
### The `getuser` call.
The `getuser` call has the following syntax: `http(s)://ip-address:port/api/API_KEY/getuser/[userid].`
The userid at the end of the URL is the variable that you need to know to get the user information.
The `getuser` call returns all the information that is stored in the database about the user. Including the hashed password, email, date of creation, username, the email hash and the userid itself.
### The `newuser` call.
The `newuser` call has the following syntax: `http(s)://ip-address:port/api/API_KEY/newuser/:name/:email/:password/:password2/.`
The `newuser` call essentially registers a new user with the following information. The newuser call has to be provided with all information that a hypothetical user would be typing into a registering form. This call returns various status codes depending on the errors occuring during the registration process. 
## TODO
1. Add email verification.
2. Add some kind of developer portal for API.
3. Add two factor authentication.
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://joblybackendpav.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  //get a list of companies
  static async getCompanies(){
    let res = await this.request(`companies`)
    return res.companies
  }

  //get a list of jobs
  static async getJobs(){
    let res = await this.request(`jobs`)
    return res.jobs
  }

  // Request a token using username and password
  static async login(data){
    let res = await this.request(`auth/token`, data, 'post')
    this.token = res.token
    return res.token  
  }

  // Create a new user using registerUser
  static async registerUser(data){
    let res = await this.request(`auth/register`, data, 'post')
    this.token = res.token
    return res.token  
  }
  // Logout by deleting the token and preventing access to serten routes
  static logout(){
    this.token = ''
  }

  //get info about the user
  static async getUser(name){
    
    let res = await this.request(`users/${name}`)
    return res
  }

  // Edit the user profile
  static async editUserProfile(username, data){
    let res = await this.request(`users/${username}`, data, 'patch')
    return res
  }

  static async jobApplication(data){
    let res = await this.request(`users/${data.username}/jobs/${data.jobId}`, {}, 'post')
    return res
  }

  // If there is user in localStorage log him in
  static autoLogin(token){
    this.token = token
  }
}

// console.log(JoblyApi.token)
// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
// {user.applications.includes(data.id) ? null : <button>Apply</button>}

export default JoblyApi;
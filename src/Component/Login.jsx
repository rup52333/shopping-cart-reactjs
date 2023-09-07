import React, { useState,useContext,useEffect  } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

// Import icons for Google, Microsoft 360, and Facebook

import MicrosoftIcon from "@mui/icons-material/Microsoft";
import FacebookIcon from "@mui/icons-material/Facebook";
import {styled} from '@mui/material'
// import { authenticateLogin } from "../service/Api";
import {Cart} from '../Context/Context.jsx';
import axios from 'axios';
// import { googleLoginApi } from "../service/Api";

// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { googleLogout } from '@react-oauth/google';

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
  email: '',
  password: ''
};
export default function Login() {
  const { setAccount } = useContext(Cart); 
 
  const [ error, showError] = useState(false);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [ login, setLogin ] = useState(loginInitialValues);

//  const  { isUserLoggedIn, setIsUserLoggedIn} = useContext(); 

   
   const URL="http://localhost:3001";




   const handleGoogleLogin = async (response) => {
    console.log(response);
    if(response) {
     showError(false);
       setAccount(response.given_name);
   }
 else{
   showError(true);
 
 
 }
 
  googleLogout();
  navigate('/home');
   
 };


const  handleFailure=(result)=>{

console.log(result);


}




  useEffect(() => {
    showError(false);
}, [login])

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
}

// const loginUser = async() => {
// //   let response = await authenticateLogin(login);
  
//   if(response) {
//     showError(false);
//       setAccount(response.data.data.name.split(' ')[0]);
//   }
// else{
//   showError(true);


// }
// setIsUserLoggedIn(true);
// googleLogout();
// }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: "white", height: "100vh" ,  borderRadius: "5%",}}>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <LockIcon
          sx={{
            fontSize: 30,
            color: "white",
            border: "2px solid #333",
            marginTop: "3%",
            borderRadius: "50%",
            backgroundColor: "purple",


          }}
        />
        {/* Lock Icon */}
        <Typography component="h1" variant="h5" sx={{ marginTop: "5%" }}>
          Please Login To Continue
        </Typography>
       
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus

            onChange={(e) => onValueChange(e)}
            variant="standard"

          />
                            { error && <Error>Please enter valid Email ID</Error> }
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => onValueChange(e)}
            variant="standard"
          />
                                      { error && <Error>Please enter valid Password</Error> }
          <FormControlLabel
            control={<Checkbox onClick={handleShowPasswordToggle} color="primary" />}
            label="Show password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Text style={{textAlign:'center'}}>OR</Text>
           <RequestOTP>Request OTP</RequestOTP>
          {/* Social login options */}
          
           
            
        
                            {/* <GoogleLogin
            clientId="641307203075-i743uim30a02c0ttbs92rd9p25pu6p01.apps.googleusercontent.com" // Replace with your actual Google API Client ID
            buttonText="Login with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            // redirectUri="http://localhost:3001/auth/google/callback" // Use the proxy route
            sx={{mb: 2,marginTop:'2px'}}
          />
         */}
   
   <GoogleOAuthProvider clientId="641307203075-i743uim30a02c0ttbs92rd9p25pu6p01.apps.googleusercontent.com" style={{mt:2}}>

<GoogleLogin
theme="filled_blue"
shape="circle"
onSuccess={credentialResponse => {

  var decoded = jwt_decode(credentialResponse.credential);

  handleGoogleLogin(decoded);
 console.log(decoded);

  }}
  onError={() => {
console.log('Login Failed');
  }}
 useOneTap
  />


</GoogleOAuthProvider>




          <Button
            fullWidth
            variant="outlined"
            startIcon={<MicrosoftIcon />}
            sx={{ mb: 2 ,mt:2,backgroundColor:'blue',color:'white'}}
          >
            Login with Microsoft 360
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{backgroundColor:'#00008B',color:'white'}}
          >
            Login with Facebook
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate('/register')}>
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
import { config } from "dotenv";

config();
const configuracion = {
  facebookAuth: {
    clientID: process.env.FB_ID_APP,
    clientSecret: process.env.FB_SECRET_PASS, // your App Secret
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }
};

export default configuracion;

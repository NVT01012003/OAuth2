import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.FACEBOOK_CLIENT_ID;
const redirect_uri = "http://localhost:3000/auth/facebook/callback";
const scope = ["email", "user_friends"].join(",");
const response_type = "code";
const auth_type = "rerequest";
const display = "popup";

const stringifiedParams = `client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&auth_type=rerequest&display=popup`;

export const facebookLoginUrl = `https://www.facebook.com/v16.0/dialog/oauth?${stringifiedParams}`;

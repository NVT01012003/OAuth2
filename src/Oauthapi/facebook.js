import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.FACEBOOK_CLIENT_ID;
export const redirect_uri = "http://localhost:5050/auth/facebook/callback";
const scope = ["email", "public_profile"].join(",");

const stringifiedParams = `client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&auth_type=rerequest&display=popup`;

export const authorizationUrl = `https://www.facebook.com/v18.0/dialog/oauth?${stringifiedParams}`;

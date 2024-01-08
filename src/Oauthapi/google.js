import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();
const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

export const oauth2Client = new google.auth.OAuth2(
    google_client_id,
    google_client_secret,
    "http://localhost:3000/auth/google/callback"
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

export const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
    prompt: "consent",
});

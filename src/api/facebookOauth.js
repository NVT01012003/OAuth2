import { Router } from "express";
import { authorizationUrl, redirect_uri } from "../Oauthapi/facebook.js";
import axios from "axios";

export const facebookOauth = Router();
let userInfo = null;
async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: "https://graph.facebook.com/v18.0/oauth/access_token",
        method: "get",
        params: {
            client_id: process.env.FACEBOOK_CLIENT_ID,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            redirect_uri,
            code,
        },
    });

    return data.access_token;
}

async function getFacebookUserData(access_token) {
    const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
            fields: ["id", "email", "first_name", "last_name"].join(","),
            access_token: access_token,
        },
    });
    return data;
}

facebookOauth.get("/callback", async (req, res) => {
    const code = req.query.code;
    const access_token = await getAccessTokenFromCode(code);
    const data = await getFacebookUserData(access_token);
    userInfo = data;
    res.status(200).json({
        data,
    });
});
facebookOauth.get("/hello", (req, res) =>
    res.status(200).json({ message: "OK" })
);
facebookOauth.get("/", (req, res) => {
    res.status(200).json({ authorizationUrl });
});

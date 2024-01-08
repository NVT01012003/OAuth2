import { Router } from "express";
import { authorizationUrl } from "../Oauthapi/google.js";
import { oauth2Client } from "../Oauthapi/google.js";
import axios from "axios";

export const googleOauth = Router();

let userCredential = null;
async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            }
        )
        .then((res) => res.data)
        .catch((error) => {
            throw new Error(error.message);
        });

    return googleUser;
}

googleOauth.get("/callback", async (req, res) => {
    const code = req.query.code;
    const userInfo = await getGoogleUser({ code });
    userCredential = userInfo;
    res.json({
        code: code || req.query.error,
        userCredential,
    });
});
googleOauth.get("/", (req, res) => {
    res.status(301).redirect(authorizationUrl);
});

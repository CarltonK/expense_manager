import express = require("express");
import HttpException from "../exceptions/http_exception";
import JwtUtility from "../utils/jwt_utility";

const jwt = new JwtUtility();

export const authUserHelper = async (request: express.Request): Promise<string | undefined> => {
        // Retrieve user data from token
        const userToken = request.headers.authorization!.split(' ')[1];
        const userTokenData: any = await jwt.verifyAccessToken(userToken);
        const { userId } = userTokenData;

        if (!userId) throw new HttpException(400, `Invalid Token`);

        return userId;
}
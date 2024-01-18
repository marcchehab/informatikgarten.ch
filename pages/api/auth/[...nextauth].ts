import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import log from '@/components/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

const env = process.env;
const authorizationUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
const tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';

function nowInSeconds() {
    return Math.trunc(Date.now()/1000);
}

async function refreshAccessToken(accessToken) {
    try {
        const body = new URLSearchParams({
            client_id:
            env.AZURE_AD_CLIENT_ID || 'azure-ad-client-id',
            client_secret:
            env.AZURE_AD_CLIENT_SECRET ||
            'azure-ad-client-secret',
            grant_type: 'refresh_token',
            refresh_token: accessToken.refreshToken,
            authorization: authorizationUrl,
            token: tokenUrl,
        });
        
        const response = await fetch(tokenUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: body
        });
        
        const refreshedTokens = await response.json();
        if (!response.ok) {
            log("WARNING", "Reponse not ok on refreshing access token.");
            throw refreshedTokens;
        }
        
        log("INFO", "Successfully refreshed access token.");
        
        return {
            ...accessToken,
            accessToken: refreshedTokens.id_token,
            accessTokenExpires: nowInSeconds() + refreshedTokens.expires_in,
            refreshToken: refreshedTokens.refresh_token ?? accessToken.refreshToken,
        };
    } catch (error) {
        return {
            ...accessToken,
            error: 'RefreshAccessTokenError',
        };
    }
}


export const authOptions = {
    providers: [
        AzureADProvider({
            clientId: env.AZURE_AD_CLIENT_ID,
            clientSecret: env.AZURE_AD_CLIENT_SECRET,
            httpOptions: { timeout: 10000 },
            // token: tokenUrl,
            authorization: {
                // url: authorizationUrl,
                params: {
                  scope: "openid profile email offline_access",
                },
              },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {

            // log("DEBUG", !!token, !!user, !!account);
            if (account && user) {
                log("INFO", "Account and user data received.");
                return {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account?.expires_at
                        ? account.expires_at
                        : 0,
                    user,
                };
            }
            const expiresinseconds = token.accessTokenExpires - nowInSeconds();
            log("DEBUG3", "accessTokenExpires in " + expiresinseconds + " seconds.");
            if (expiresinseconds > 100) {
                return token;
            }
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (session) {
                session.user = token.user;
                session.error = token.error;
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
};

const handler = await NextAuth(authOptions);

export { handler as GET, handler as POST };
export default handler;
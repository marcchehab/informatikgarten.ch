import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

const env = process.env;

async function refreshAccessToken(token) {
    try {
        const url = `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

        const body = new URLSearchParams({
            client_id:
                env.AZURE_AD_CLIENT_ID || 'azure-ad-client-id',
            client_secret:
                env.AZURE_AD_CLIENT_SECRET ||
                'azure-ad-client-secret',
            scope: 'email openid profile User.Read offline_access',
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken,
        });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body,
        });

        const refreshedTokens = await response.json();
        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.id_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}


export const authOptions = {
    providers: [
        AzureADProvider({
            clientId: `${env.AZURE_AD_CLIENT_ID}`,
            clientSecret: `${env.AZURE_AD_CLIENT_SECRET}`,
            tenantId: `${env.AZURE_AD_TENANT_ID}`,
            authorization: {
                params: { scope: 'openid email profile User.Read  offline_access' },
            },
            httpOptions: { timeout: 10000 },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    accessToken: account.id_token,
                    accessTokenExpires: account?.expires_at
                        ? account.expires_at * 1000
                        : 0,
                    refreshToken: account.refresh_token,
                    user,
                };
            }

            if (Date.now() < Number(token.accessTokenExpires) - 100000 || 0) {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default handler;
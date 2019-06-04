import { AuthenticationContext } from 'react-adal';

const clientId = 'Your client Id here.';

export const adalConfig = {
	instance: 'https://login.microsoftonline.com/',
	clientId: clientId,
	extraQueryParameter: 'nux=1',
	endpoints: {
		graphApi: 'https://graph.microsoft.com'
	},
	postLogoutRedirectUrl: window.location.origin,
	redirectUri: window.location.origin,
	cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

// returns the token form the cache
export const getGraphToken = () => {
	return authContext.getCachedToken('https://graph.microsoft.com');
};

// gets the token from the microsoft login service
export const acquireToken = () => {
	authContext.acquireToken(adalConfig.endpoints.graphApi, (message, token, msg) => {
		return token;
	});

	return null;
};

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactAi from 'react-appinsights';

ReactAi.init({
	instrumentationKey: yourInstrumentationKey,
	disableAjaxTracking: false,
	disableExceptionTracking: false
});

let ai = ReactAi.ai();

if (ai.context) {
	ai.context.addTelemetryInitializer((envelope) => {
		var tags = envelope.tags;

		if (tags['ai.user.id']) {
			tags['ai.user.id'] = '9839832';
			tags['ai.user.authUserId'] = 'Rodney Wormsbecher';
		}
	});
}

ReactDOM.render(<App />, document.getElementById('root'));

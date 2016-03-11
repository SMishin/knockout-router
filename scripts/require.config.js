// require.js looks for the following global when initializing
var require = {
	baseUrl: "/scripts",
	paths: {
		"bootstrap": "./bootstrap.min",
		"jquery": "./jquery-2.2.1",
		"knockout": "./knockout-3.4.0",
		'router': './sammy-router',
		'ko.router': './knockout.router',
		"sammy": "./sammy-0.7.5",
		"text": "./text"

	},
	shim: {
		"bootstrap": { deps: ["jquery"] }
	}
};

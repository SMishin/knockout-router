(function (factory) {
	// Module systems magic dance.

	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		factory(require("sammy"), exports);
	} else if (typeof define === "function" && define["amd"]) {
		define(['sammy', 'exports'], factory);
	} else {
		factory(Sammy, window);
	}
}(function (sammy, exports) {
	"use strict";

	class SammyRouter {

		constructor(sammy) {
			sammy = sammy || window.Sammy;

			if (!sammy) {
				throw new Error('knockout router requires Sammy');
			}

			this.sammy = sammy;
		}

		init(routes, routeHandlerFacrory) {

			var sammy = this.sammy;

			sammy(function () {

				var _summy = this;

				function registerRoutes() {

					var routeNames = [],
						route,
						i;

					for (var routeName in routes) {
						routeNames.push(routeName);
					}

					i = routeNames.length;

					while (i--) {
						route = routes[routeNames[i]];
						_summy.get(route.url, (routeHandlerFacrory && routeHandlerFacrory(route) || function () { }));
					}

				}

				registerRoutes();

			});

			sammy().run();
		}
	}

	return exports.router = new SammyRouter(sammy);

}));

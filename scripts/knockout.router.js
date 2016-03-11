(function (factory) {
	// Module systems magic dance.

	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		// CommonJS or Node: hard-coded dependency on "knockout"
		factory(require("knockout"), require('router'), exports);
	} else if (typeof define === "function" && define["amd"]) {
		// AMD anonymous module with hard-coded dependency on "knockout"
		define(['knockout', 'router', 'exports'], factory);
	} else {
		// <script> tag: use the global `ko` object, attaching a `mapping` property
		factory(ko, router, ko.router = {});
	}
}(function (ko, router, exports) {
	"use strict";

	ko.router = exports;

	class KoRouter {

		constructor(ko, router) {

			ko = ko || window.ko;

			if (!ko) {
				throw new Error('knockout router requires Knockout');
			}

			var self = this;

			this.ko = ko;
			this.router = router;


			this.currentRoute = null;
			this.component = ko.observable();

			this.routeComponentLoader = {
				loadViewModel: function (name, viewModelConfig, callback) {

					var _baseViewModel = function (params) {

						var obj = (viewModelConfig.createViewModel && new viewModelConfig.createViewModel()) || new viewModelConfig(params);

						obj.component = ko.observable();
						obj.componentEnable = ko.observable(false);

						self.currentRoute.viewModel = obj;

						return obj;
					};

					ko.components.defaultLoader.loadViewModel(name, _baseViewModel, callback);
				}
			}
		}

		registerRoutes(routes) {
			this.routes = routes;
		}

		initialize() {

			var ko = this.ko;

			if (!this.routes) {
				return false;
			}

			ko.components.loaders.unshift(this.routeComponentLoader);

			this.router.init(this.routes, this._getRouteHandlerFacеory());

			return true;
		}

		_getRouteHandlerFacеory() {
			var routes = this.routes,
				self = this;

			return function (route) {

				//todo:refactor here
				return function () {
					var toRun = [];

					function clean() {

						function needToClean() {

							var pr;

							if (!route.parent) {
								return true;
							}

							pr = routes[route.parent];

							while (pr !== null) {

								if (pr.url === self.currentRoute.url) {
									return false;
								}

								if (pr.parent) {
									pr = routes[pr.parent];
								} else {
									pr = null;
								}

							}

							return true;
						}

						if (!self.currentRoute) {
							return;
						}

						if (!needToClean()) {
							return;
						}

						delete self.currentRoute.viewModel;

						var pr = null;

						if (self.currentRoute.parent) {
							pr = routes[self.currentRoute.parent];
						}

						while (pr !== null && route.url !== pr.url) {

							delete pr.viewModel;

							if (pr.parent) {
								pr = routes[pr.parent];
							} else {
								pr = null;
							}
						}
					}

					function run(r) {

						if (r.viewModel) {
							r.viewModel.componentEnable(false);
						}

						if (!r.parent) {
							self.component(r.component);
						} else {

							if (!routes[r.parent].viewModel) {
								toRun.unshift(r);
								run(routes[r.parent]);
								return;
							} else {
								routes[r.parent].viewModel.component(r.component);
								routes[r.parent].viewModel.componentEnable(true);
							}
						}

						self.currentRoute = r;

						setTimeout(function () {

							if (toRun.length > 0) {
								run(toRun.shift());
							}

						}, 0);
					}

					clean();
					run(route);
				};
			}
		}
	}

	ko.router = new KoRouter(ko, router);

	return exports;

}));

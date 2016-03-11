define(['jquery', 'knockout', 'ko.router'], function ($, ko) {

	ko.components.register('home', { require: 'app/components/home/home' });
	ko.components.register('project', { require: 'app/components/project/project' });
	ko.components.register('edit-project', { require: 'app/components/edit-project/edit-project' });
	ko.components.register('project-new', { require: 'app/components/project-new/project-new' });

	$(function() {

		ko.router.registerRoutes($.extend(Object.create(null), {
			'home': {
				url: '/',
				component: "home"
			},
			'project': {
				url: ':project',
				component: "project"
			},
			'project.edit': {
				parent: 'project',
				url: ':project/edit',
				component: "edit-project"
			},
			'project.edit.new': {
				parent: 'project.edit',
				url: ':project/edit/new',
				component: "project-new"
			}
		}));

		if (ko.router.initialize()) {
			ko.applyBindings(ko.router);
		}

	});

});

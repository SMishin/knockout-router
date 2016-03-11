
define(["knockout", "text!./project-new.html"], function (ko, template) {

	function ViewModel(params) {
		console.log('in project-new');
		console.log(params);
	}

	return { viewModel: ViewModel, template: template };
});


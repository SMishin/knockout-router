
define(["knockout", "text!./edit-project.html"], function (ko, projectTemplate) {

	function ViewModel(params) {
		console.log('in edit-project');
		console.log(params);
	}

	return { viewModel: ViewModel, template: projectTemplate };
});

﻿
define(["knockout", "text!./project.html"], function (ko, projectTemplate) {
	
	function ViewModel(params) {
		console.log('in project');
		console.log(params);
	}

	return { viewModel: ViewModel, template: projectTemplate };
});


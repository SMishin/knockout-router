define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

	function HomeViewModel(params) {
		console.log('in home');
		console.log(params);
	}

	return { viewModel: HomeViewModel, template: homeTemplate };

});
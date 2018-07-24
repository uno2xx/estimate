jQuery(function($){
	
	$('.estimate-button').on('click', function(){

		var categoryName = $('#categoryName').val();
		var categoryLow = $('#categoryLow').val();
		var categoryHigh = $('#categoryHigh').val();

		var data = {
			'category_name' : categoryName,
			'low'	: categoryLow,
			'high'	:categoryHigh
		};

		var html = '<tr>';
		html += '<td>1</td><td>'+ categoryName +'</td><td>'+ categoryLow +'%</td><td>'+ categoryHigh +'%</td><td><button class="estimate-edit">edit</button></td>';
		html += '</tr>';

		$('tbody').append(html);

		console.log(data);
	});	

});
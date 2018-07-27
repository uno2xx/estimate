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

		

		$.ajax({
			type: 'POST',
			url: EstimateAjax.ajaxurl,
			data: {'action':'insert_category',data:data},
			success: function(response) {
				alert('Category was successfully added!');
				var data = JSON.parse(response.data);
				var html = '<tr>';
				html += '<td>'+data.id+'</td><td class="text-left">'+ categoryName +'</td><td>'+ categoryLow +'%</td><td>'+ categoryHigh +'%</td><td><button class="estimate-edit" data-id="'+data.id+'">edit</button></td>';
				html += '</tr>';
				$('tbody').append(html);
				clearform();
			}
		});
	});	
});

function clearform() {
	jQuery('#categoryName').val('');
	jQuery('#categoryLow').val('');
	jQuery('#categoryHigh').val('');
}
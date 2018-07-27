var id = 0;
var elem;
jQuery(function($){


	$('.estimate-table').on('click', 'button.estimate-edit', function(){
		elem = $(this)
		id = $(this).data('id');
		$.ajax({
			type: 'GET',
			url: EstimateExternalAjax.ajaxurl,
			data: {'action':'get_category',id:id},
			dataType: 'json',
			success: function(response) {
				var data = JSON.parse(response.data);
				$('#categoryName').val(data.category_name);
				$('#categoryLow').val(data.low);
				$('#categoryHigh').val(data.high);
			}
		});
	});

	$('.estimate-table').on('click', 'button.estimate-delete', function(){
		var el = $(this)
		var dataId = $(this).data('id');
		var confirmation = confirm('Press OK to delete');
		if (confirmation==true){
			$.ajax({
				type: 'GET',
				url: EstimateExternalAjax.ajaxurl,
				data: {'action':'delete_category',id:dataId},
				dataType: 'json',
				success: function(response) {
					if( JSON.parse(response.data).delete == true ) {
						el.parent().parent().remove();
					}
				}
			});
		}
	});
	
	$('.estimate-button').on('click', function(){
		var categoryName = $('#categoryName').val();
		var categoryLow = $('#categoryLow').val();
		var categoryHigh = $('#categoryHigh').val();

		var data = {
			'category_name' : categoryName,
			'low'	: categoryLow,
			'high'	:categoryHigh
		};
		console.log(data);
		
		if( $('#categoryName').val() == "" || $('#categoryLow').val() == "" || $('#categoryHigh').val() == "" ) {
			alert('All fields are required');
		} else {
			if( id == 0 ) {
				$.ajax({
					type: 'POST',
					url: EstimateAjax.ajaxurl,
					data: {'action':'insert_category',data:data},
					success: function(response) {
						alert('Category was successfully added!');
						var data = JSON.parse(response.data);
						var html = '<tr>';
						html += '<td>'+data.id+'</td><td class="text-left">'+ categoryName +'</td><td>'+ categoryLow +'%</td><td>'+ categoryHigh +'%</td><td><button class="estimate-edit" data-id="'+data.id+'">edit</button> <button class="estimate-delete" data-id="'+data.id+'">delete</button></td>';
						html += '</tr>';
						$('tbody').append(html);
						clearform();
					}
				});
			} else {
				$.ajax({
					type: 'POST',
					url: EstimateAjax.ajaxurl,
					data: {'action':'update_category',data:data,id:id},
					success: function(response) {
						alert('Category was successfully updated!');
						console.log(response);
						var data = JSON.parse(response.data);
						elem.parent().parent().find('td').eq(1).text(data.category_name);
						elem.parent().parent().find('td').eq(2).text(data.low+'%');
						elem.parent().parent().find('td').eq(3).text(data.high+'%');
						clearform();
						id = 0;
					}
				});
			}
		}

	});	
});

function clearform() {
	jQuery('#categoryName').val('');
	jQuery('#categoryLow').val('');
	jQuery('#categoryHigh').val('');
}
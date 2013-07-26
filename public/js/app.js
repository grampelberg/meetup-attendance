
$(document).ready(function() {
	var elem = $("input[name=name]");
	elem.typeahead({ source: _.keys(attendees) });
	elem.change(function() {
		$("input[name=member_id]").val(attendees[elem.val()]);
	});
});
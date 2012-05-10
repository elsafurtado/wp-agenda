/*
 * Administracao da agenda
 * http://blog.alexandremagno.net
 *
 * Use fullcalendar.css for basic styling.
 * For event drag & drop, required jQuery UI draggable.
 * For event resizing, requires jQuery UI resizable.
 *
 * Copyright (c) 2009 Adam Shaw
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
var DateConvert = {
	toObject: function(date, time) {
		var dateArray = date.split('/');
		var timeArray = time.split(':');
		var DateObject = new Date(dateArray[2], dateArray[1]-1, dateArray[0], timeArray[0], timeArray[1]);
		return DateObject;
	}
}

jQuery(document).ready(function() {
	
  jQuery('#wp-agenda-calendar').fullCalendar({
		monthNames: agenda_locale.monthNames,
		monthNamesShort: agenda_locale.monthNamesShort,
		dayNames: agenda_locale.dayNames,
		dayNamesShort: agenda_locale.dayNamesShort,
		header: agenda_locale.header,
		buttonText: agenda_locale.buttonText,
		editable: false,
<<<<<<< HEAD
		loading: function(loading){
    if (loading) {
				jQuery.blockUI({
					message: 'loading...'
=======
		loading: function(loading){
    if (loading) {
				jQuery.blockUI({
					message: 'Carregando eventos...'
>>>>>>> c11db2bc4e4d1058081e99c2c19fd31f1efa06e8
				});
			}
			else {
				jQuery.unblockUI();
			}
		},
		className: 'the-event',
    timeFormat: 'H(:mm)',
		events: function(start, end, callback) {
			var date_results = [];
			jQuery.ajax({
				url: ajaxurl,
				dataType: 'json',
				data: {action: 'agenda_events'},
				success: function(results) {
					events = [];
          for (result in results) {
						events.push({
							id : results[result]['ID'],
							title : results[result]['post_title'],
							url : results[result]['guid'],
							content: results[result]['post_excerpt'],
							start: DateConvert.toObject(results[result]['start_date'][0], results[result]['start_time'][0]),
							end: DateConvert.toObject(results[result]['end_date'][0], results[result]['end_time'][0]),
              thumbnail: results[result]['thumbnail'],
							allDay: false							
						});
	
					}
					callback(events);
         
				},
				complete: function(xhr, message) {
				},
				error: function(xhr, type, e) {
					console.info(type);
				} 
			});
			
		},
		eventMouseover: function(event, jsEvent, view) {
			var html = '<h3>'+event.title+'</h3>';
      html += '<div class="wp-agenda-tooltip-image">' + event.thumbnail + '</div>';
      html += '<p>'+event.content+'</p>';
      
      jQuery(this).tooltip({
         bodyHandler: function() {
            return html;
         }
      });

		}
	});
});
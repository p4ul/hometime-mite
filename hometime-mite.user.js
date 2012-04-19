// ==UserScript==
// @name		Fancy JSLint
// @namespace		jQueryFancyJSLint
// @include		*
// @author		paul
// @description	Helps to get you home on time
// @version		0.0.2
// @match https://*.mite.yo.lk/
// @match https://*.mite.yo.lk/daily
// ==/UserScript==

/*global document, $*/

var main = function () {
	'use strict';
	var version = '0.0.2';
	
	//create a button
	
	$('.side:last').append( $('<span>').html($('<a id="time_left">').addClass('button').html('show time')) );
	$('.side:last').append( $('<br>').css('clear','both' ) );
	$('.side:last').append( $('<span id="stats">').css({float:'left',height:'50px','margin-left':'15px'}).html('') );


var goalMinutes = 7*60+30,
	defaultHomeTime = "17:30";


$('.side:last').append(' 	\
	<h2>options</h2> \
<form>	\
<label for="goalMinutes">goal minutes</label> \
<input type="text" class="goalMinutes" name="goalMinutes" value="'+goalMinutes+'" /><br />	\
<label for="homeTime">home time</label> \
<input type="text" class="homeTime" name="homeTime" value="'+defaultHomeTime+'" /><br /> \
<h3>breaks</h3> \
<input type="text" class="break" value="30" /><a class="removeBreak" href="#">- break</a><br /> \
<a class="addBreak" href="#">add break</a> \
</form> ');


	
	//new Date(year, month, day, hours, minutes, seconds, milliseconds)
	//d.getHours();
	
	
	
	function goalMinutesLeft(){
	
		
		return goalMinutes-getTotalTime();
	}
	
	function getTotalTime(){
		var timeArray = $('#minutes_sum').text().split(':'),
			totalTime = timeArray[0] * 60 + parseInt(timeArray[1],10);
			
		return totalTime;		
	}
	
	function getHomeTime(){
		var then = new Date();
	
		var timeArray = $('.homeTime').val().split(':');

		then.setHours(timeArray[0]);
		then.setMinutes(timeArray[1]);
		
		return then;
	}
	
	function getStatus(homeTime, goalMinutesLeft) {
		var now = new Date(), 
			status = {},
			remainingMins = ( homeTime.getHours() * 60 - now.getHours() * 60 ) + ( homeTime.getMinutes() - now.getMinutes() );
		
		status.remainingMins = remainingMins;
		status.goalMinutesLeft = goalMinutesLeft;
		status.spareMinutes = remainingMins - goalMinutesLeft;
		return status;
	}
	
	$('#time_left').live('click',function(){
				var status = getStatus(getHomeTime(), goalMinutesLeft());
				console.dir(status);
				$('#stats').html('');
				$('#stats').append($('<p>').html("remaining minutes " + status.remainingMins));
				$('#stats').append($('<p>').html("goal minutes " + status.goalMinutesLeft));
				$('#stats').append($('<p>').html("spare minutes " + status.spareMinutes));
	});
		
};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '$(document).ready(' + main.toString() + ');';
console.log(script.textContent);
document.body.appendChild(script);




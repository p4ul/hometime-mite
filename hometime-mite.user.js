// ==UserScript==
// @name		Fancy JSLint
// @namespace		jQueryFancyJSLint
// @include		*
// @author		paul
// @description	Helps to get you home on time
// @version		0.0.1
// @match https://*.mite.yo.lk/
// @match https://*.mite.yo.lk/daily
// ==/UserScript==

/*global document, $*/

var main = function () {
	'use strict';
	var version = '0.0.1';
	
	//create a button
	
	$('.side:last').append( $('<span>').html($('<a id="time_left">').addClass('button').html('show time')) );
		$('.side:last').append( $('<br>').css('clear','both' ) );
	$('.side:last').append( $('<span id="stats">').css({float:'left',height:'50px','margin-left':'15px'}).html('') );
	
	//new Date(year, month, day, hours, minutes, seconds, milliseconds)
	//d.getHours();
	
	var goalMinutes = 7*60+30;
	
	function goalMinutesLeft(){
	
		
		return goalMinutes-getTotalTime();
	}
	
	function getTotalTime(){
		var timeArray = $('#minutes_sum').text().split(':'),
			totalTime = timeArray[0] * 60 + parseInt(timeArray[1],10);
			
		return totalTime;		
	}
	
	function homeTime(){
		var then = new Date();
	
		then.setHours('17');
		then.setMinutes('30');
		
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
				var status = getStatus(homeTime(), goalMinutesLeft());
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




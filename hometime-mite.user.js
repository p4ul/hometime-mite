// ==UserScript==
// @name        Fancy JSLint
// @namespace       jQueryFancyJSLint
// @include     *
// @author      paul
// @description Helps to get you home on time
// @version     0.0.2
// @match https://*.mite.yo.lk/
// @match https://*.mite.yo.lk/daily
// ==/UserScript==

/*global document, $*/

var main = function () {
    'use strict';

    function getStore(item) {
        return window.localStorage.getItem(item);
    }
    function setStore(item,value){
        console.log('setting'+value);
        window.localStorage.setItem(item,value);
    }

    var version = '0.0.2',
        defaultGoalMinutes = getStore('defaultGoalMinutes') ? getStore('defaultGoalMinutes') : 7*60+30,
        defaultHomeTime = getStore('defaultHomeTime') ? getStore('defaultHomeTime') :"17:30";
    

    //create a button    
    $('.side:last').append( $('<span>').html($('<a id="time_left">').addClass('button').html('show time')) );
    $('.side:last').append( $('<br>').css('clear','both' ) );
    $('.side:last').append( $('<span id="stats">').css({float:'left',height:'50px','margin-left':'15px'}).html('') );



    $('.side:last').append('    \
        <h2>options</h2> \
        <form>  \
        <label for="goalMinutes">goal minutes</label> \
        <input type="text" class="goalMinutes" name="goalMinutes" value="'+defaultGoalMinutes+'" /><br />  \
        <label for="homeTime">home time</label> \
        <input type="text" class="homeTime" name="homeTime" value="'+defaultHomeTime+'" /><br /> \
        <h3>breaks</h3> \
        <input type="text" class="break" value="30" /><a class="removeBreak" href="#">- break</a><br /> \
        <a class="addBreak" href="#">add break</a> \
        </form> ');

    $('.goalMinutes').bind('change',function(d){setStore('defaultGoalMinutes',$(this).val());});
    $('.homeTime').bind('change',function(d){setStore('defaultHomeTime',$(this).val());});


    $('.main.second').after($('<div id="stats">').addClass('main').css({float:'left',height:'50px',width:'77%','background-color':''}).html(''));

    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    //d.getHours();

    function getGoalMinutesLeft(){
        var goalMinutes = $('.goalMinutes').val();
        return goalMinutes-getTotalTime();
    }

    function getTotalTime(){
        var timeArray = $('#minutes_sum').text().split(':'),
            totalTime = timeArray[0] * 60 + parseInt(timeArray[1],10);
        return totalTime;
    }

    function getHomeTime(){
        var then = new Date(),
            timeArray = $('.homeTime').val().split(':');

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
                var status = getStatus(getHomeTime(), getGoalMinutesLeft());
                console.dir(status);
                $('#stats').html('');
                $('#stats').append("remaining minutes in day ");
                $('#stats').append( $('<em>').html(status.remainingMins));
                $('#stats').append(", goal minutes left ");
                $('#stats').append( $('<em>').html(status.goalMinutesLeft));
                $('#stats').append(", spare minutes ");
                $('#stats').append( $('<em>').html(status.spareMinutes));
    });
};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '$(document).ready(' + main.toString() + ');';
console.log(script.textContent);
document.body.appendChild(script);

var debug = true;
// uncomment next line to disable debug messages.
//debug = false;
var log = function(){};
if(debug){
    log = console.log;
}

function renderSchedule(){
    const startTime = 8;    
    const endTime = 12+5;     

    var timeBlockContainer = $('.container');
    var currentHour = parseInt(moment().format('H'));

    for(i = startTime; i <= endTime; i++){
        var rowEl = $('<div>').addClass('row');
        var timeEl = $('<div>').addClass('col-1 hour text-right ').text(moment(i, 'H').format('ha'))
        var activityEl = $('<div>').addClass('col-10 time-block ').attr('data-hour', i);

        var text = localStorage.getItem(i);
        if(text){
            activityEl.text(text);
        }


        if(i < currentHour){
            activityEl.addClass('past');
        }else if(i > currentHour){
            activityEl.addClass('future');
        }else{
            activityEl.addClass('present');
        }


        var iconEl = $('<div>').addClass('col-1 saveBtn align-middle text-center h-100');

        rowEl.append([timeEl, activityEl, iconEl]);
        timeBlockContainer.append(rowEl);
        
    }

}


function updateDate(){
    $('#currentDay').text(moment().format('dddd MMMM Do YYYY'));
}


// update every minute
setInterval(function(){
    updateDate();
}, 60*1000);


updateDate()
renderSchedule();

// time block clicked -> show text area
$('.container').on('click', '.time-block', function(event){
    var target = $(event.target);
    log(target);
    if(target.hasClass('editing'))return;
    log('event.target', event.target);
    var text = target.text();
    if(!target.hasClass('editing' && target.is('div'))){
        var textAreaEl = $('<textarea>').text(text);
        target.empty().append(textAreaEl);
        textAreaEl.focus();
        textAreaEl.width(textAreaEl.parent().width());
        textAreaEl.height(textAreaEl.parent().height()-10);
        target.addClass('editing');


        // add save icon
        var saveIcon = $('<i>').addClass("material-icons text-center h-100 ").text('save');
        target.closest('.row').find('.saveBtn').empty().append(saveIcon);

    }
});

// save button clicked -> save the result and update display
$('.container').on('click', '.saveBtn', function(event){
    var target = $(event.target);
    // var timeBlockEl = target.prev(); //good

    var timeBlockEl = target.closest('div .row').find('.editing');
    log('timeBlockEl', timeBlockEl);

    if(timeBlockEl.length){
            
        var text = timeBlockEl.find('textarea').val().replace('\n',' ');
        var hour = timeBlockEl.attr('data-hour');
    
        timeBlockEl.empty().text(text);
        timeBlockEl.removeClass('editing');
    
        localStorage.setItem(hour, text);

        // remove the save icon
        target.closest('.row').find('.saveBtn').empty();
    
        log('value', text);
        log('hour', hour);
        log(target.prev());

    }
});
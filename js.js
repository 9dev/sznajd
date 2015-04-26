$(function() {

// State variables

    var PAUSE = false;

// Event handlers

    $('#start').click(function(){
        uiDisable(true);
        disable('start', true);
        disable('pause', false);
        disable('reset', false);

        if (PAUSE) {
            // resume
            PAUSE = false;
        } else {
            // start from the beginning
        }

        //
    });

    $('#pause').click(function(){
        uiDisable(true);
        disable('start', false);
        disable('pause', true);
        disable('reset', false);

        //
    });

    $('#reset').click(function(){
        uiDisable(false);
        disable('start', false);
        disable('pause', true);
        disable('reset', false);

        //
    });

// Getters

    function getMode() {
        return $("input[type='radio']:checked").val();
    }

    function getBreakTime() {
        return $('#break').val();
    }

    function getLength() {
        return $('#people').val();
    }

    function getProbability() {
        return $('#probability').val();
    }

// Helpers

    function uiDisable(v) {
        $('#break, #people, #probability').prop('readonly', v);
        $('#antagonize, #nothing').prop('disabled', v);
    }

    function disable(name, v) {
        $('#' + name).prop('disabled', v);
    }

// Debug info

    console.log(getMode(), getBreakTime(), getLength());

});

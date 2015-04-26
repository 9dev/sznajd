$(function() {

// Event handlers

    $('#start').click(function(){
        //
    });

    $('#reset').click(function(){
        //
    });

    $('#pause').click(function(){
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

// Debug info

    console.log(getMode(), getBreakTime(), getLength());

});

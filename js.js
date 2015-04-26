$(function() {

// State variables

    var PAUSE;

    var POPULATION;
    var LEN;

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

    function createPopulation() {
        var num_yes = Math.floor(getProbability() * LEN / 100);
        var index;

        // fill entire population with NO opinions
        POPULATION = new Array();
        for (var i = 0; i < LEN; ++i) {
            POPULATION[i] = false;
        }

        // randomly place YES opinions
        for (var i = 0; i < num_yes; ++i) {
            index = Math.floor(Math.random()*LEN);
            if ( POPULATION[index] ) --i;
            else POPULATION[index] = true;
        }
    }

    function printPreview() {
        var $preview = $('#preview');
        var cls;

        for ( var i = 0; i < LEN; ++i ) {
            cls = POPULATION[i] ? 'yes' : 'no';
            $preview.append('<div class="person ' + cls + '"></div>');
        }
    }

// Init

    function init() {
        PAUSE = false;
        LEN = getLength();

        createPopulation();
        printPreview();
    }

    init();

});

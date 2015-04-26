$(function() {

// State variables

    var INTER;

    var PAUSE;

    var POPULATION;
    var ANTAGONIZE;
    var DELAY;
    var LEN;

    var PREVIOUS_N1;
    var PREVIOUS_N2;

// Event handlers

    $('#start').click(function(){
        uiDisable(true);
        disable('start', true);
        disable('pause', false);
        disable('reset', false);

        if (!PAUSE) {
            // start from the beginning
            init();
        }

        PAUSE = false;
        INTER = setInterval(iterate, DELAY);
    });

    $('#pause').click(function(){
        window.clearInterval(INTER);

        uiDisable(true);
        disable('start', false);
        disable('pause', true);
        disable('reset', false);

        PAUSE = true;
    });

    $('#reset').click(function(){
        window.clearInterval(INTER);

        uiDisable(false);
        disable('start', false);
        disable('pause', true);
        disable('reset', false);

        PAUSE = false;
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

        $preview.html('');
        for ( var i = 0; i < LEN; ++i ) {
            cls = POPULATION[i] ? 'yes' : 'no';
            $preview.append('<div id="person' + i + '" class="person ' + cls + '"></div>');
        }
    }

    function setOpinion(index, value) {
        POPULATION[index] = value;
        $('#person' + index).removeClass('yes').removeClass('no').addClass(value ? 'yes' : 'no');
    }

    function iterate() {
        // choose randomly two neighbours
        var n1 = Math.floor(Math.random()*LEN);
        var n2 = n1 == LEN-1 ? 0 : n1+1;

        // locate closest neighbourhood of chosen people
        var c1 = n1 == 0 ? LEN-1 : n1-1;
        var c2 = n2 == LEN-1 ? 0 : n2+1;

        // highlight our pair in the preview
        $('#person' + PREVIOUS_N1 + ', #person' + PREVIOUS_N2).removeClass('highlight');
        $('#person' + n1 + ', #person' + n2).addClass('highlight');

        // apply Sznajd model
        if ( POPULATION[n1] == POPULATION[n2] ) {
            setOpinion(c1, POPULATION[n1]);
            setOpinion(c2, POPULATION[n1]);
            console.log(c1, n1, n2, c2, 'AGREED', 'Neighbours changed to "' + POPULATION[n1] + '"');
        } else {
            if ( ANTAGONIZE ) {
                setOpinion(c1, POPULATION[n2]);
                setOpinion(c2, POPULATION[n1]);
                console.log(c1, n1, n2, c2, 'CONFLICT', 'Neighbours changed to "' + POPULATION[c1] + '" and "' + POPULATION[c2] + '"');
            } else {
                console.log(c1, n1, n2, c2, 'CONFLICT', 'Neighbours not changed');
            }
        }

        PREVIOUS_N1 = n1;
        PREVIOUS_N2 = n2;
    }

// Init

    function init() {
        window.clearInterval(INTER);

        PAUSE = false;
        DELAY = getBreakTime();
        LEN = getLength();
        ANTAGONIZE = getMode() == 1;
        PREVIOUS_N1 = 0;
        PREVIOUS_N2 = 0;

        createPopulation();
        printPreview();
    }

});

    var langArray = [
    {
        value: '<automata>     <state id="A">         <transition value="a" src="A" target="B"/>        <transition value="a" src="A" target="A"/>        <transition value="a" src="A" target="D"/>     </state>     <state id="B">         <transition value="c" src="B"  target="C"/>         <transition value="b" src="B"  target="D"/>     </state>     <state id="C">         <transition value="a" src="C"  target="D"/>         <transition value="b" src="C"  target="A"/>     </state>     <state id="D"><transition value="a" src="D"  target="D"/></state>     <initial id="A"/>      <initial id="B"/>     <final id="D"/> </automata>',
        text: "Automata 1"
    },
    {value: "val2", text: "Automata 2"},
    {
        value: '<automata>     <state id="A">         <transition value="a" src="A" target="B"/>     </state>     <state id="B">         <transition value="c" src="B"  target="C"/>         <transition value="b" src="B"  target="D"/>     </state>     <state id="C">         <transition value="a" src="C"  target="D"/>         <transition value="b" src="C"  target="A"/>     </state>     <state id="D">         <transition value="a" src="D" target="D"/>         <transition value="c" src="D"  target="D"/>     </state>     <initial id="A"/>     <final id="D"/> </automata>',
        text: "Automata 3"
    }
];

var select = document.getElementById('mySelect'),
    option,
    i = 0,
    il = langArray.length;

for (; i < il; i += 1) {
    option = document.createElement('option');
    option.setAttribute('value', langArray[i].value);
    option.appendChild(document.createTextNode(langArray[i].text));
    select.appendChild(option);
}

function getAutomata() {
    //dost mozno ide len na firefoxe
    /*var xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
     var data = xhr.responseText;
     alert(data);
     }
     }
     xhr.open('GET', 'index/list', true);
     xhr.send(null);*/

    //obecne riesenie?

    $.ajax({
        url: "index/list",
        type: "GET",
        success: function(html){
            alert(html);
        }
    });

    /*
     $.get('index/list', function(data) {
     alert(data);
     });*/

}

function selectAutomata() {
    temp = document.getElementById("automataToDelete").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            data = xhr.responseText;
            alert(data);
        }
    };
    xhr.open('GET', 'index/selectAutomata?automataToSelect='+temp, true);
    xhr.send(null);
    return data;
}

function deleteAutomata() {
    temp = document.getElementById("automataToDelete").value;
    alert(temp);
    /*$.ajax({
     type: "DELETE",
     url: "index/delete",
     data: {"automataToDelete": temp},
     success : function () {
     getAutomata();
     }
     });*/

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var data = xhr.responseText;
            alert(data);
        }
    };
    xhr.open('DELETE', 'index/delete?automataToDelete='+temp, true);
    xhr.send(null);
}

function getStates($xml, id) {
    var res = [];
    $.each(id, function (i, val) {
        res.push($xml.find('state[id=' + val + ']'));
    });
    return res;
}

function getElementAttribute(state, type) {
    var id = [];
    for (var q = 0; q < state.length; ++q) {
        id.push(state[q].getAttribute(type));
    }
    return id;
}

var a = 0;
var b = -1;
var c = 0;

function stepDrawAutomaton() {
    if (a < store.length) {
        if (b == -1) {
            automaton.activeStates = initId;
        } else {
            automaton.activeStates = store[a][b];
        }
        drawAutomaton(automaton);

        b++;

        if (b == store[a].length) {
            if ($(automaton.finStates).not(store[a][b - 1]).length !==
                automaton.finStates.length) {
                alert("Word " +
                    document.getElementById("inputWords").value.split(" ")[a] +
                    " has been accepted.");
            }
            b = -1;
            a++;
        }
    } else {
        alert("Last word has been reached.");
    }
}

function myFunction() {
    a = 0;
    b = -1;
    c = 0;
    var message = "Accepted words: ";

    var input = document.getElementById("inputWords").value;


    //var $xml = $($.parseXML(select.value));

    var xmlDoc = $.parseXML( data ),
        $xml = $( xmlDoc );
    //var $xml = $.parseXML(data);
    console.log($xml);
    initId = getElementAttribute($xml.find('initial'), 'id');
    var finId = getElementAttribute($xml.find('final'), 'id');

    automaton = {
        states: $xml.find('state'),
        transitions: $xml.find('transition'),
        activeStates: [],
        initStates: initId,
        finStates: finId
    };

    var success = true;

    var words = input.split(" ");

    store = [];

    for (var k = 0; k < words.length; k += 1) {
        if (words[k] === "") {
            //split string when empty
            break;
        }

        store[k] = [];
        //store[k].length = 0;

        automaton.activeStates.length = 0;

        var $current = getStates($xml, initId);

        automaton.activeStates = initId;

        for (var j = 0; j < words[k].length; j += 1) {
            var newStates = [];
            newStates.length = 0;

            $.each($current, function (i, val) {
                newStates = newStates.concat(getElementAttribute(val
                        .find('transition[value =' + words[k][j] + ']'),
                    'target'));
            });

            // remove duplicate states id's
            newStates = $.unique(newStates);

            //do not comment
            automaton.activeStates = jQuery.extend(true, {}, newStates);

            store[k][j] = [];
            store[k][j] = newStates;
            console.log(newStates);
            if (newStates) {
                $current = getStates($xml, newStates);
            } else {
                success = false;
            }
        }

        if (success) {
            var result = $(finId).not(newStates);
            if (result.length !== finId.length) {
                message = message + words[k] + " ";
            }
        }
    }

    document.getElementById("output").innerHTML = message;
}
var width = 650,
    height = 650,
    radius = 220,
    center = [width / 2, height / 2];

var r = 20;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

function positionX(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return Math.sin(angle * (Math.PI / 180));
}

function positionY(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return -Math.cos(angle * (Math.PI / 180));
}

function circlePosX(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return center[0] + (Math.sin(angle * (Math.PI / 180)) * radius);
}

function circlePosY(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return center[1] + (-Math.cos(angle * (Math.PI / 180)) * radius);
}

function circleArrowPosX(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return (Math.sin(angle * (Math.PI / 180)) * (r + 10));
}

function circleArrowPosY(numStates, whichState) {
    var angle = (360 / numStates) * whichState;
    return (-Math.cos(angle * (Math.PI / 180)) * (r + 10));
}

function drawAutomaton(automaton) {
    var states = [];
    for (var n = 0; n < automaton.states.length; ++n) {
        var stateObject = {
            id: automaton.states[n].getAttribute('id'),
            x: circlePosX(automaton.states.length, n),
            y: circlePosY(automaton.states.length, n),
            posX: positionX(automaton.states.length, n),
            posY: positionY(automaton.states.length, n)
        };
        states.push(stateObject);
    }

    var state_to_commom_state = [];
    var links = [];
    for (var k = 0; k < automaton.transitions.length; ++k) {
        var label_from = automaton.transitions[k].getAttribute("src");
        var id_from = 0;
        for (var l = 0; label_from !== automaton.states[l].getAttribute("id"); ++l) {
            ++id_from;
        }
        var label_to = automaton.transitions[k].getAttribute("target");
        var id_to = 0;
        for (var m = 0; label_to !== automaton.states[m].getAttribute("id"); ++m) {
            ++id_to;
        }
        var linkObject = {
            s: id_from,
            t: id_to,
            label: automaton.transitions[k].getAttribute("value")
        };
        if (id_from !== id_to) {
            links.push(linkObject);
        } else {
            state_to_commom_state.push(linkObject);
        }

    }

    for (var e = 0; e < state_to_commom_state.length; ++e) {
        svg.append("circle")
            .attr("r", r + 5)
            .attr("cx", center[0] +
                states[state_to_commom_state[e].s].posX * (radius + r) +
                circleArrowPosX(states.length, state_to_commom_state[e].s))
            .attr("cy", center[1] +
                states[state_to_commom_state[e].s].posY * (radius + r) +
                circleArrowPosY(states.length, state_to_commom_state[e].s))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr('fill-opacity', 0);
        svg.append("text")
            .style("fill", "black")
            .attr("x", center[0] +
                states[state_to_commom_state[e].s].posX * (radius + r) +
                circleArrowPosX(states.length, state_to_commom_state[e].s))
            .attr("y", center[1] +
                states[state_to_commom_state[e].s].posY * (radius + r) +
                circleArrowPosY(states.length, state_to_commom_state[e].s))
            .style("font-size", "17px")
            .style("font-wight", "bold")
            .text(state_to_commom_state[e].label);

    }

    for (var i = 0; i < states.length; ++i) {
        var color = "white";
        for (var j = 0; j < automaton.activeStates.length; ++j) {
            if (states[i].id === automaton.activeStates[j]) {
                color = "red";
                break;
            }
        }
        svg.append("circle")
            .attr("r", r)
            .attr("cx", center[0] + states[i].posX * (radius + r))
            .attr("cy", center[1] + states[i].posY * (radius + r))
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("fill", color);
        svg.append("text")
            .style("fill", "black")
            .attr("x", center[0] + states[i].posX * (radius + r))
            .attr("y", center[1] + states[i].posY * (radius + r))
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-wight", "bold")
            .text(states[i].id);
    }

    svg.append("svg:defs").selectAll("marker")
        .data(["arrow"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 12)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
    svg.selectAll("line")
        .data(links)
        .enter()
        .append("svg:line")
        .attr("x1", function (d) {
            return states[d.s].x;
        })
        .attr("y1", function (d) {
            return states[d.s].y;
        })
        .attr("x2", function (d) {
            return states[d.t].x;
        })
        .attr("y2", function (d) {
            return states[d.t].y;
        })
        .attr("class", "link arrow")
        .attr("marker-end", "url(#arrow)");

    for (var h = 0; h < links.length; ++h) {
        svg.append("text")
            .style("fill", "black")
            .attr("x", states[links[h].s].x +
                (states[links[h].t].x - states[links[h].s].x) * 0.75)
            .attr("y", states[links[h].s].y +
                (states[links[h].t].y - states[links[h].s].y) * 0.75)
            .attr("dy", 0.90 * (
                    (states[links[h].t].x - states[links[h].s].x) == 0 ?
                        0 :
                    (states[links[h].t].x - states[links[h].s].x) /
                    (states[links[h].t].x - states[links[h].s].x)
                ) + "em")
            .attr("dx", 0.90 * (
                    (states[links[h].t].y - states[links[h].s].y) == 0 ?
                        0 :
                    (states[links[h].t].y - states[links[h].s].y) /
                    (states[links[h].t].y - states[links[h].s].y)
                ) + "em")
            .style("font-size", "17px")
            .style("font-wight", "bold")
            .text(links[h].label);
    }
}
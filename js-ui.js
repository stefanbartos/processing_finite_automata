var langArray = [
    {
        value: '<automata>     <state id="A">         <transition value="a" target="B"/>     </state>     <state id="B">         <transition value="c" target="C"/>         <transition value="b" target="D"/>     </state>     <state id="C">         <transition value="a" target="D"/>         <transition value="b" target="A"/>     </state>     <state id="D">         <transition value="a" target="D"/>         <transition value="c" target="D"/>     </state>     <initial id="A"/>     <final id="D"/> </automata>',
        text: "Automata 1"
    },
    {value: "val2", text: "Automata 2"}
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

function getState($xml, id) {
    return $xml.find('state[id=' + id + ']');
}

function myFunction() {
    var message = "Accepted words: ";
    var input = document.getElementById("inputWords").value;

    var $xml = $($.parseXML(select.value));

    var initId = $xml.find('initial').attr('id');
    var finId = $xml.find('final').attr('id');
    var success = true;

    var words = input.split(" ");

    for (var k = 0; k < words.length; k += 1) {
        var $current = getState($xml, initId);
        var $fin = getState($xml, finId);

        for (var j = 0; j < words[k].length; j += 1) {
            var $transition = $current.find('transition[value =' + words[k][j] + ']');

            if ($transition) {
                var newId = $transition.attr('target');
                $current = getState($xml, newId);
                //displayProgress()
            } else {
                success = false;
                break;
            }
        }
        if (success) {
            if ($current.attr('id') == $fin.attr('id')) {
                message = message + words[k] + " ";
            }
        }
    }
    d3.
    document.getElementById("output").innerHTML = message;
}



//POLE AUTOMATOV
var langArray = [
	{value: '<automata>     <state id="A">         <transition value="m" target="B"/>     </state>     <state id="B">         <transition value="c" target="C"/>         <transition value="b" target="D"/>     </state>     <state id="C">         <transition value="a" target="D"/>         <transition value="b" target="A"/>     </state>     <state id="D">         <transition value="a" target="D"/>         <transition value="c" target="D"/>     </state>     <initial id="A"/>     <final id="D"/> </automata>', text: "Automata 1"},
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



function getState($xml, id){
	return $xml.find('state[id='+id+']');
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
			var data = xhr.responseText;
			alert(data);
		}
	}
	xhr.open('GET', 'index/selectAutomata?automataToSelect='+temp, true);
	xhr.send(null);
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
	}
	xhr.open('DELETE', 'index/delete?automataToDelete='+temp, true);
	xhr.send(null);
}

//SPUSTENIE AUTOMATU
function myFunction() {
	var message = "Accepted words: "
	input = document.getElementById("myText").value;

	var $xml = $($.parseXML(select.value));


	var initId = $xml.find('initial').attr('id');
	var finId = $xml.find('final').attr('id');
	var success = true;

	words = input.split(" ");
	var k = 0;
	for (; k < words.length; k += 1) {
		var $current = getState($xml,initId);
		var $fin = getState($xml,finId);
		var j = 0;
		for (; j < words[k].length; j += 1) {
			var $transition = $current.find('transition[value ='+words[k][j]+']');

			if($transition){
				var newId = $transition.attr('target');
				$current = getState($xml,newId);
				//displayProgress()
			}
			else{
				success = false;
				break;
			}
		}
		if(success){
			if($current.attr('id') == $fin.attr('id')){
				message = message + words[k] + " ";
			}
		}
	}
	document.getElementById("output").innerHTML = message;
}

//TODO Load of XML FILE
/*function loadDoc(url) {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
 if (xhttp.readyState == 4 && xhttp.status == 200) {

 }
 };
 xhttp.open("GET", url, true);
 xhttp.send();
 }
*/
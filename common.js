var editMode = false;
//var editingText = false;
var elementInEditor = null;
var idNumber = 0;

//Egy elem szuloelemenek a torlese
function removeParent(element) {
	var tmp_p = element.parentNode;
	var tmp_parent = tmp_p.parentNode;
	tmp_parent.removeChild(tmp_p);
}

//Egy array tartalmazza-e a megadott elemet
function isInArray(array, element) {
	for (var a = 0; a < array.length; a++) {
		if (array[a] == element) { return true; }
	}
	return false;
}
//kikeresi az adott osztalyu elemeket
function getElementByClassName(classname)	{	
	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var tmp = new Array();
	var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			tmp[j] = els[i];
			j++;
		}
	}
	return tmp;	
}
//egyedi Id-t general
function generateId(element) {
	var id = element.tagName + "_nr_" + idNumber;
	idNumber++;
	return id;
}
function getSelectionCharOffsetsWithin(element) {
    var start = 0, end = 0;
    var sel, range, priorRange;
    if (typeof window.getSelection != "undefined") {
        range = window.getSelection().getRangeAt(0);
        priorRange = range.cloneRange();
        priorRange.selectNodeContents(element);
        priorRange.setEnd(range.startContainer, range.startOffset);
        start = priorRange.toString().length;
        end = start + range.toString().length;
				var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
    } else if (typeof document.selection != "undefined" &&
            (sel = document.selection).type != "Control") {
        range = sel.createRange();
        priorRange = document.body.createTextRange();
        priorRange.moveToElementText(element);
        priorRange.setEndPoint("EndToStart", range);
        start = priorRange.text.length;
        end = start + range.text.length;
    }
    return {
        start: start,
        end: end,
				id: actelement.id,
    }
}
//highlight
function highlightText(string, element) {
	element.innerHTML = string;
	return element;
}
function decorateUserHighlight(element){
	if (typeof window.getSelection != "undefined") {
		range = window.getSelection().getRangeAt(0);
		priorRange = range.cloneRange();
		priorRange.selectNodeContents(range.startContainer);
		priorRange.setEnd(range.startContainer, range.startOffset);
		start = priorRange.toString().length;
		end = start + range.toString().length;
	}
	var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
	for (var a = 0; a < actelement.childNodes.length; a++) {
		if(actelement.childNodes[a] === window.getSelection().getRangeAt(0).startContainer) {
			var fragment = document.createDocumentFragment();
			fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(0, start)));
			fragment.appendChild(highlightText(actelement.childNodes[a].nodeValue.substr(start, end-start), element));
			fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(end)));
			actelement.replaceChild(fragment, actelement.childNodes[a]);
		}
	}
}
function getSelectionHtml() {
decorateUserHighlight(document.createElement("b"));
}

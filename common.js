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

function generateId(element) {
	var id = element.tagName + "_nr_" + idNumber;
	idNumber++;
	return id;
}
function getSelectionElement(element) {
	if (typeof(element.selectionStart) != "undefined")	{
		return element;
	}
	if (!element.childNodes[0]) {
		return 0;
	}
	for (var a = 0; a < element.childNodes.length; a++) {
		var ret = getSelectionElement(element.childNodes[a]);
		if (ret != 0) return element.childNodes[a];
	}
	return 0;
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
function decorateUserHighlight(){
	if (typeof window.getSelection != "undefined") {
		range = window.getSelection().getRangeAt(0);
		priorRange = range.cloneRange();
		priorRange.selectNodeContents(document.getElementById('editor-box'));
		priorRange.setEnd(range.startContainer, range.startOffset);
		start = priorRange.toString().length;
		end = start + range.toString().length;
	}
	var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
	for (var a = 0; a < actelement.childNodes.length; a++) {
		if(actelement.childNodes[a] === window.getSelection().getRangeAt(0).startContainer) {
			var fragment = document.createDocumentFragment();
			fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(0, start)));
			fragment.appendChild(highlightText(actelement.childNodes[a].nodeValue.substr(start, end-start), document.createElement("b")));
			fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(end)));
			actelement.replaceChild(fragment, actelement.childNodes[a]);
		}
	}
}
function getSelectionElementIds(element) {
		var text1 = "<b>";
		var text2 = "</b>";
    if (typeof window.getSelection != "undefined") {
        range = window.getSelection().getRangeAt(0);
        priorRange = range.cloneRange();
        priorRange.selectNodeContents(element);
        priorRange.setEnd(range.startContainer, range.startOffset);
        start = priorRange.toString().length;
        end = start + range.toString().length;
		}
		var elementids = new Array();
	//	var allelements = window.getSelection().getRangeAt(0).commonAncestorContainer.getElementsByTagName("*");
		var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
//addig battyogunk, amig meg nem talaljuk a szulo elemben a kezdo poziciot tartalmazo nodeot
		for (var a = 0; a < actelement.childNodes.length; a++) {
			if (actelement.childNodes[a] === window.getSelection().getRangeAt(0).startContainer) {
				//megvan az a node, ami a kijelolt szoveg elso karakteret tartalmazza
				if (actelement.childNodes[a].length >= end) {			//ekkor csak ezt a nodeot kell vegignezni es orulunk
					var begin = actelement.childNodes[a].data.substr(0, start);
					var selection = actelement.childNodes[a].data.substr(start, end-start);
					var end = actelement.childNodes[a].data.substr(end);
					//actelement.childNodes[a].data = begin + text1 + selection + text2 + end;
				//	actelement.replaceChild(
				}
			}
		}
		return elementids;
		/*for (var a = 0, j = 1; a < end-start; a++) {
			var aa = window.getSelection();
			var bb = aa.getRangeAt(a);
			var cc = bb.startContainer;
			var dd = cc.parentNode;
			var tmp = window.getSelection().getRangeAt(a).startContainer.parentNode;
			if(!isInArray(elementids, tmp)) {
				elementids[j] = tmp;
				j++;
			}	
		}*/
}
function getSelectionHtml() {
//	var v = getSelectionElementIds(document.getElementById("editor-box"));
decorateUserHighlight();
/*	var text1 = "<b>";
	var text2 = "</b>";
			var range = getSelectionCharOffsetsWithin(document.getElementById("editor-box"));
			if (range.start != range.end != 0) { 
					var editorContent = document.getElementById(range.id);
					var begin = editorContent.innerText.substr(0, range.start); 
 					var selection = editorContent.innerText.substr(range.start, range.end - range.start); 
		 			var end = editorContent.innerText.substr(range.end); 
 					document.getElementById(range.id).innerHTML = begin + text1 + selection + text2 + end; 
			}*/
	/*var range = getSelectionCharOffsetsWithin(document.getElementById("editor-box"));
	//alert(range.start + ": " + range.end);
	var text1 = "<b>";
	var text2 = "</b>";
	if (range.start != range.end != 0 && range.id.length > 0) { 
		for (var a = 0; a < range.id.length; a++) {
			var editorContent = document.getElementById(range.id[a]);
			var begin = editorContent.innerText.substr(0, range.start); 
 			var selection = editorContent.innerText.substr(range.start, range.end - range.start); 
 			var end = editorContent.innerText.substr(range.end); 
 			document.getElementById(range.id).innerHTML = begin + text1 + selection + text2 + end; 
		}
	}*/
}

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
	//beallitja az offsetet (start) es a range hosszat (end)
	if (typeof window.getSelection != "undefined") {
		range = window.getSelection().getRangeAt(0);
		priorRange = range.cloneRange();
		priorRange.selectNodeContents(range.startContainer);
		priorRange.setEnd(range.startContainer, range.startOffset);
		start = priorRange.toString().length;
		end = start + range.toString().length;
	}
	/*******************************
	//kikeresi azt a nodeot ami a szoveget tartalmazza. ha az egesz kijeloles a nodeon belul van, akkor a node 3 reszre lesz pattintva
	//ha a kijeloles hosszabb, akkor a node ket reszre osztodik, endet csokkentjuk az elso nodeban kijelolt resszel, majd a kovetkezo textnodeon folytatjuk
	//a kijelolest.
	********************************/
	var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
	for (var a = 0; a < actelement.childNodes.length; a++) {
		if (actelement.childNodes[a] === window.getSelection().getRangeAt(0).startContainer) {
			if (actelement.childNodes[a].length >= end) {
				var fragment = document.createDocumentFragment();
				fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(0, start)));
				fragment.appendChild(highlightText(actelement.childNodes[a].nodeValue.substr(start, end-start), element.cloneNode()));
				fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(end)));
				actelement.replaceChild(fragment, actelement.childNodes[a]);
			} else  {
				var fragment = document.createDocumentFragment();
				fragment.appendChild(document.createTextNode(actelement.childNodes[a].nodeValue.substr(0, start)));
				end = end - actelement.childNodes[a].nodeValue.substr(start).length;
				fragment.appendChild(highlightText(actelement.childNodes[a].nodeValue.substr(start), element.cloneNode()));
				actelement.replaceChild(fragment, actelement.childNodes[a]);
				a += 2;
				b = a;
				while (end - start > 0) {
					if(actelement.childNodes[b]) {
						for (b = a; b < actelement.childNodes.length; b++) {
							if (actelement.childNodes[b].nodeType == 3) {
								if (actelement.childNodes[b].nodeValue.length < end - start) {
									if (typeof(actelement) == element) {
										end = end - actelement.childNodes[b].nodeValue.length;
									} else {
										var fragment = document.createDocumentFragment();
										fragment.appendChild(highlightText(actelement.childNodes[b].nodeValue, element.cloneNode()));
										end = end - actelement.childNodes[b].nodeValue.length;
										actelement.replaceChild(fragment, actelement.childNodes[b]);
										b++;
									}
								} else {
									var fragment = document.createDocumentFragment();
									fragment.appendChild(highlightText(actelement.childNodes[b].nodeValue.substr(0, end - start), element.cloneNode()));
									fragment.appendChild(document.createTextNode(actelement.childNodes[b].nodeValue.substr(end - start)));
									actelement.replaceChild(fragment, actelement.childNodes[b]);
									end = 0;
									b = actelement.childNodes.length + 1;
								}
							}
						}
					} else {
						a = 0;
						b = 0;
						var found = false;
						while (found == false) {
							var parentelement = actelement.parentNode;
							for (var c = 0; c < parentelement.childNodes.length; c++) {
								if (parentelement.childNodes[c] === actelement) {
									if (!parentelement.childNodes[c+1]) {
										actelement = actelement.parentNode;
									} else {
										actelement = parentelement.childNodes[c+1];
										c = parentelement.childNodes.length + 1;
										found = true;
									}
								}
							}
						}
					}
				}
				return;
			}
		}
	}
}
function getSelectionHtml() {
decorateUserHighlight(document.createElement("b"));
}

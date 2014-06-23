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
function highlightText(string, newClassName) {
	var element = document.createElement("span");
	element.setAttribute("name", "inserted");
	element.className = newClassName;
	element.innerHTML = string;
	return element;
}
function isInClass(element, cName) {
	var regExp = new RegExp(cName);
	return regExp.test(element.className);
	//return element.hasClass(cName);
}
function replaceTextNode(textNode, start, end, newClass) {
				var fragment = document.createDocumentFragment();
				var incr = 0;
				if (isInClass(textNode.parentNode, newClass)){
					if (start > 0) {
						incr = 5;
					} else {
						incr = 4;
					}
					return { 
						fragment: textNode,
						inc: incr
					}
				}
				if (start > 0) {
					fragment.appendChild(document.createTextNode(textNode.nodeValue.substr(0, start)));
					incr++
				}
				fragment.appendChild(highlightText(textNode.nodeValue.substr(start, end-start), newClass));
				incr++
				if (end < textNode.nodeValue.length) {
					fragment.appendChild(document.createTextNode(textNode.nodeValue.substr(end)));
					incr++
				}
				return {
					fragment: fragment,
					inc: incr
				}
}
function findNextTextNode(element) {
	if (element.parentNode.name != "inserted") {
		if (element.nodeType == 3) {
			return element;
		}
		if (element.childNodes[0]) {
			return findNextTextNode(element.childNodes[0]);
		}
	} else {
		element.parentNode.setAttribute("name", "");
	}
	var parentElement = element.parentNode;
	for (var cntr = 0; cntr < parentElement.childNodes.length; cntr++) {
		if (parentElement.childNodes[cntr] === element) {
			if (!parentElement.childNodes[cntr + 1]) {
				var found = false; 
				while (!found) {
					var newParent = parentElement.parentNode;
					for (var pcntr = 0; pcntr < newParent.childNodes.length; pcntr++) {
						if (newParent.childNodes[pcntr] === parentElement) {
							if (!newParent.childNodes[pcntr + 1]) {
								parentElement = newParent;
								pcntr = newParent.childNodes.length + 1;
							} else {
								parentElement = newParent.childNodes[pcntr + 1];
								found = true;
								pcntr = newParent.childNodes.length + 1;
							}
						}
					}
				}
				return findNextTextNode(parentElement);
			}
		return findNextTextNode(parentElement.childNodes[cntr + 1]);
		}
	}
}
function decorateUserHighlight(newClass){
	var start = 0;
	var end = 0;
	var cntr = 0;
	//beallitja az offsetet (start) es a range hosszat (end)
	if (typeof window.getSelection != "undefined") {
		range = window.getSelection().getRangeAt(0);
		priorRange = range.cloneRange();
		priorRange.selectNodeContents(range.startContainer);
		priorRange.setEnd(range.startContainer, range.startOffset);
		start = priorRange.toString().length;
		end = start + range.toString().length;
	}
	cntr = end;
	/*******************************
	//kikeresi azt a nodeot ami a szoveget tartalmazza. ha az egesz kijeloles a nodeon belul van, akkor a node 3 reszre lesz pattintva
	//ha a kijeloles hosszabb, akkor a node ket reszre osztodik, endet csokkentjuk az elso nodeban kijelolt resszel, majd a kovetkezo textnodeon folytatjuk
	//a kijelolest.
	********************************/
	var actelement = window.getSelection().getRangeAt(0).startContainer.parentNode;
	for (var a = 0; a < actelement.childNodes.length; a++) {
		if (actelement.childNodes[a] === window.getSelection().getRangeAt(0).startContainer) {
			if (actelement.childNodes[a].length >= cntr) {
			/***************************
			//amikor csak egy textnodeon belul jeloltuk ki a szoveget
			***************************/
				var fragment = replaceTextNode(actelement.childNodes[a], start, cntr, newClass);
				if (fragment.inc > 3 && !isInClass(actelement, newClass)) {		//ha egyet nott, akkor ha nincs a szulonek olyan osztalya, akkor hozzavesszuk, egyebkent meg uj elem.
								actelement.className += " " + newClass;
				} else {
					actelement.replaceChild(fragment.fragment, actelement.childNodes[a]);
				}
				var i_text = document.getElementsByName("inserted");
				i_text[0].setAttribute("name", "");
			} else {
				/*************************
				//ha hosszabb mezot jeloltunk ki mint a kezdo szovegmezo hossza, akkor az elso mezot ket reszre bentjuk, az elso fele marad kijeloletlen
				//a masik fele pedig highlightolt ezert itt start = start, end pedig a sztring hossza lesz.
				*************************/
				var fragment = replaceTextNode(actelement.childNodes[a], start, actelement.childNodes[a].nodeValue.length, newClass);
				cntr = cntr - actelement.childNodes[a].nodeValue.substr(start).length;
				if (!isInClass(actelement, newClass)) {
					actelement.replaceChild(fragment.fragment, actelement.childNodes[a]);
				}
				if (fragment.inc > 3) {
					fragment.inc -= 3;	
				}
				a += fragment.inc;
				b = a;
				var acte = actelement.childNodes[a];
				/*************************
				//Elso blokk ket lehetosege utan vegignezzuk a maradek blokkokat a maradek karakterekert  
				*************************/
				while (cntr - start > 0) {
					if (actelement.childNodes[b]) {
						var nextText = findNextTextNode(actelement.childNodes[b]);
					} else {
						actelement.childNodes[b-1].parentNode.setAttribute("name", "inserted");
						var nextText = findNextTextNode(actelement.childNodes[b-1]);
					}
					var parentelement = nextText.parentNode;
					var index = -1;
					//mivel removechild utan elveszett a node igy most valahogy megkeressuk.
					for (var e = 0; e < parentelement.childNodes.length; e++) {
						if (parentelement.childNodes[e] === nextText)
							index = e;
					}
					if (nextText.nodeValue.length < cntr - start) {
						if (isInClass(nextText.parentNode, newClass)) {
							cntr = cntr - nextText.nodeValue.length;
							nextText.parentNode.setAttribute("name", "inserted");
						} else {
							if (nextText.parentNode.tagName == "SPAN") {
								nextText.parentNode.className += " " + newClass;
								nextText.parentNode.setAttribute("name", "inserted");
								cntr = cntr - nextText.nodeValue.length;
							} else {
								var fragment = replaceTextNode(nextText, 0, nextText.nodeValue.length, newClass);
								cntr = cntr - nextText.nodeValue.length;
								actelement.replaceChild(fragment.fragment, nextText);
							}
						}
					} else {
						var fragment = replaceTextNode(nextText, 0, cntr - start, newClass);
						actelement.replaceChild(fragment.fragment, nextText);
						cntr = 0;
					}
				}
				return;
			}
		}
	}
}
function getSelectionHtml(cName) {
decorateUserHighlight(cName);
}
//kepek meretet szedi ossze, ha backgroundba kerul
function getMeta(src) {
	var image = document.createElement("img");
	image.src = src;
	return {
		imageWidth: image.width,
		imageHeight: image.height
	}
}


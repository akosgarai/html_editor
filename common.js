var editMode = false;
var elementInEditor = null;
var idNumber = 0;

//Egy elem szuloelemenek a torlese
function removeParent(element) {
	var tmp_p = element.parentNode;
	var tmp_parent = tmp_p.parentNode;
	tmp_parent.removeChild(tmp_p);
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

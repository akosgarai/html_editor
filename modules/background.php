<?php
function backgroundColorSelector() {
	global $colors;
	$module = "<div id=\"bg-selector-submodule\"><div class=\"double\"><label for=\"bg-color-selector\">Hatterszin</label></div><div class=\"double\"><select id=\"backgroundColor\" name=\"bg-color-selector\" onchange=\"setStyleValueSelect(this)\">";
		foreach($colors as $color) {
			$module .= "<option name=\"$color\" id=\"bg_$color\" class=\"bg-color-selector\" style=\"color: $color;\">$color</option>";
		}
	$module .= "</select></div></div>";
	return $module;
}
function colorSelector() {
	global $colors;
	$module = "<div id=\"color-selector-submodule\"><div class=\"double\"><label for=\"color-selector\">Betuszin</label></div><div class=\"double\"><select id=\"color\" name=\"color-selector\" onchange=\"setStyleValueSelect(this)\">";
	foreach($colors as $color) {
		$module .= "<option name=\"$color\" id=\"font_$color\" class=\"font-color-selector\" style=\"color: $color;\">$color</option>";
	}
	$module .= "</select></div></div>";
	return $module;
}
function uploadImageModule() {
	$module = "<form method=\"post\" action=\"editor_main.php?action=upload\" enctype=\"multipart/form-data\" id=\"u-i-form\"><label for=\"file\">Filename:</label><input type=\"file\" name=\"file\" id=\"file\"><br /><input type=\"hidden\" id=\"saveEditorContent\"><input type=\"button\" name=\"sb\" value=\"Upload\" onclick=\"uploadImage(this.parentNode)\"></form>";
	return $module;
}
function listImageModule() {
	$list = new editorModel();
	$conn = $list->connect();
	$container = "<div class=\"image-list\" onclick=\"\" >";

	if ($conn != "OK") {
		addError($conn);
	}
	$iList = $list->listImages();
	if(substr($iList, 0, 5) == "ERROR") {
		addError($iList);
	} else {
		$module = "<div id=\"image-selector-module\"><select id=\"image-list\"><option value=\"none\" name=\"image-list\">none</option>";
		while ($row = mysql_fetch_assoc($iList)) {
			//$module .= "<li>$container<div class=\"image-name\">$row[name]</div>$buttons</div></li>";
			$module .= "<option value=\"$row[src]\" name=\"image-list\">$row[name]</option>";
		}
			$buttons = "</select><div class=\"image-bg\" onclick=\"setBgImage(document.getElementById('image-list'))\">Bg</div><div class=\"image-img\" onclick=\"insertImage(document.getElementById('image-list'))\">I</div>";
		$module .= $buttons."</div>";
	return $module;
	}
}
function backgroundRepeat() {
	$repeatlist = array('no-repeat', 'repeat', 'repeat-x', 'repeat-y');
	$module = "<div id=\"repeat-selector-module\"><div class=\"repeat-selector-left\"><label for=\"repeat-list\">Background repeat</label></div><div class=\"repeat-selector-left\"><select id=\"background-repeat\" onchange=\"setStyleValueSelect(this)\">";
	foreach ($repeatlist as $value) {
		$module .= "<option  value=\"$value\">$value</option>";
	}
	$module .= "</select></div></div>";
	return $module;
}

function backgroundPosition() {
	$pos1 = array('left', 'center', 'right');
	$pos2 = array('top', 'center', 'bottom');
	$module = "<div id=\"background-position-module\"><div class=\"triple\"><label>Position</label></div><div class=\"doubletriple\"><select id=\"backgroundPosition\" onchange=\"setStyleValueSelect(this)\">";
	foreach ($pos1 as $p1) {
		foreach ($pos2 as $p2) {
			$module .= "<option value=\"$p1 $p2\">$p1 $p2</option>";
		}
	}
	$module .= "</select></div></div>";
	return $module;
}

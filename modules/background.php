<?php
class backgroundModule {
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
	function backgroundPosition() {
		$pos1 = array('left', 'center', 'right');
		$pos2 = array('top', 'center', 'bottom');
		$module = "<div id=\"background-position-module\"><div class=\"triple labelbutton triplebutton\" onclick=\"changeSelectValue(this.parentNode)\"><p>Position</p></div><div class=\"doubletriple\"><select id=\"backgroundPosition\" class=\"right\">";
		foreach ($pos1 as $p1) {
			foreach ($pos2 as $p2) {
				$module .= "<option value=\"$p1 $p2\">$p1 $p2</option>";
			}
		}
		$module .= "</select></div></div>";
		return $module;
	}
	function createBackgroundModule() {
		$module = generateModuleContainer("backgroundModule", "Hatter");
		$bgcolor = colorSelectorSubmodule("background-color", "Bg-color", "backgroundColor"); 
		$module .= $bgcolor;
		$fcolor = colorSelectorSubmodule("color", "Color", "color");
		$module .= $fcolor;
		$listIm = $this->listImageModule();
		$module .= $listIm;
		$bgrepeat = createSelectSubmodule(array('no-repeat', 'repeat', 'repeat-x', 'repeat-y'), "background-repeat", "Bg-Repeat", "backgroundRepeat", "double", "double");
		$module .= $bgrepeat;
		$bgPos = $this->backgroundPosition();
		$module .= $bgPos;
		$uploadIM = $this->uploadImageModule();
		$module .= $uploadIM;
		$module .= "</div></div>";
		return $module;
	}
}

<?php
$messages = "";
function addError($error) {
	global $messages;
	$newError = "<span class=\"error\">".$error."</span>";
  $messages .= $newError;
}
function addMessage($message) {
	global $messages;
	$newMessage = "<span class=\"message\">".$message."</span>";
  $messages .= $newMessage;
}
function checkImageType($file) {
	//var_dump($file);
	$types = array("image/gif", "image/jpeg", "image/jpg", "image/png", "image/x-png","image/pjpeg");
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $file["name"]);
	$extension = end($temp);
	if (in_array($extension, $allowedExts)) {
		if ($file["error"] > 0) {
			addError($file["error"]);
		} else {
			if (file_exists("upload/".$file["name"])) {
				addError("File already exists.");
			} else {
				move_uploaded_file($file["tmp_name"], "upload/".$file["name"]);
				return "OK";
			}
		}
	} else {
		addError("invalid file");
	}
}
function createSelectSubmodule($values, $submoduleId, $labelText, $cssProperty, $class1, $class2) {
	$module = "<div id=\"$submoduleId-submodule\"><div class=\"$class1 labelbutton\" onclick=\"changeSelectValue(this.parentNode)\"><p>$labelText</p></div><div class=\"$class2\"><select id=\"$cssProperty\" class=\"right\">";
	foreach ($values as $v) {
		$module .= "<option value=\"$v\">$v</option>";
	}
	$module .= "</select></div></div>";
	return $module;
}
function createNumericSubmodule($submoduleId, $labelText, $cssProperty, $values) {
	$module = "<div id=\"$submoduleId-submodule\"><div class=\"triple pointer button\" onclick=\"setStyleValueNumeric(this.parentNode)\"><p>$labelText</p></div><div class=\"doubletriple\"><div class=\"double\"><input type=\"number\" name=\"$cssProperty-numeric\" id=\"$cssProperty-numeric\" style=\"max-width:50px;\"/></div><div class=\"double\"><select id=\"$cssProperty\">";
	foreach ($values as $v) {
		$module .= "<option value=\"$v\">$v</option>";
	}
	$module .= "</select></div></div></div>";
	return $module;
}
function multipleNumericSubmodule($submoduleId, $labelMainText, $label1, $label2, $label3, $label4, $cssProperty) {
		$module = "<div id=\"$sumoduleId-submodule\"><div id=\"$cssProperty\" class=\"pointer longbutton\" onclick=\"multipleNumeric(this.parentNode)\"><p>$labelMainText<p></div><div class=\"double\"><div class=\"triple\"><label>$label1</label></div><input type=\"number\" name=\"$label1-numeric\" id=\"$label1-numeric\" style=\"max-width:50px;\" value=\"0\"/></div><div class=\"double\"><div class=\"triple\"><label>$label2</label></div><input type=\"number\" name=\"$label2-numeric\" id=\"$label2-numeric\" style=\"max-width:50px;\" value=\"0\"/></div><div class=\"double\"><div class=\"triple\"><label>$label3</label></div><input type=\"number\" name=\"$label3-numeric\" id=\"$label3-numeric\" style=\"max-width:50px;\" value=\"0\"/></div><div class=\"double\"><div class=\"triple\"><label>$label4</label></div><input type=\"number\" name=\"$label4-numeric\" id=\"$label4-numeric\" style=\"max-width:50px;\" value=\"0\"/></div></div>";
		return $module;

}
function colorSelectorSubmodule($submoduleId, $labelText, $cssProperty) {
	$module = "<div id=\"$submoduleId-submodule\"><div class=\"double pointer button doublebutton\" id=\"$cssProperty\" onclick=\"changeColor(this.parentNode)\"><p>$labelText</p></div><div class=\"double\">#<input type=\"text\" name=\"$labelText-numeric\" id=\"$labelText-numeric\" style=\"max-width:50px; float:right;\" /></div></div>";
	return $module;
}
?>

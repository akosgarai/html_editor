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
	$module = "<div id=\"$submoduleId-submodule\"><div class=\"$class1\"><label>$labelText</label></div><div class=\"$class2\"><select id=\"$cssProperty\" onchange=\"setStyleValueSelect(this)\">";
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
?>

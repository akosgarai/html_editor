<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';

header("X-XSS-Protection: 0");
$colors = array('red', 'green', 'blue', 'yellow', 'black', 'white', 'brown', 'chartreuse', 'chocolate', 'orange', 'gold');
if (array_key_exists("new_page", $_POST)) {		
	selector();
}
if (array_key_exists("savepage", $_POST)) {
	$save = new editorModel();
	$conn = $save->connect();
	if ($conn != "OK") {
		addError($conn);
	}
	$s = $save->savePage($_POST['savepage']);
	if ($s != "OK") {
		addError($s);
	}
	selector(($_POST['savepage']));
}
if (array_key_exists("saved_pages", $_POST)) {
	$load = new editorModel();
	$conn = $load->connect();
	if ($conn != "OK") {
		addError($conn);
	}
	$l = $load->loadPage($_POST['saved_pages']);
	$row = mysql_fetch_assoc($l);
	var_dump($row);
	selector($row[page_content]);
}
/************
Upload image
************/
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
if (isset($_GET["action"]) && $_GET["action"] == "upload") {
/*	if ($_FILES["file"]["error"] > 0) {
		addError($_FILES["file"]["error"]);
	}
	var_dump($_GET);*/
	$try = checkImageType($_FILES["file"]);
	if ($try == "OK") {
		$img = new editorModel();
		$conn = $img->connect();
		if ($conn != "OK") {
			addError($conn);
		}
		$i = $img->uploadImage($_FILES["file"]["name"]);
		if (substr($i, 0, 5) == "ERROR") {
			addError($i);
		} else {
			addMessage("image Uploaded");
		}
	}
	var_dump($_POST);
	selector($_POST["saveEditorContent"]);
}
function selector($pageContent = NULL) {
	$smarty = new Smarty;
	global $messages;
	$bgColorSelectorModule = backgroundColorSelector();
	$fontColorSelectorModule = colorSelector();
	$uploadImageModule = uploadImageModule();
	$listImageModule = listImageModule();
		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', 'Save'));
		$smarty->assign('bgColorSelectorModule', $bgColorSelectorModule);
		$smarty->assign('fontColorSelectorModule', $fontColorSelectorModule);
		$smarty->assign('messages', $messages);
		$smarty->assign('uploadImageModule', $uploadImageModule);
		$smarty->assign('listImageModule', $listImageModule);
		if($pageContent == NULL){
			$smarty->assign('initScript', 'changescript("")');
		} else {
			$pageContent = htmlspecialchars_decode($pageContent);
			$smarty->assign('pageContent', $pageContent);
		}
		$smarty->display('template/editor_main.tpl');
}

function backgroundColorSelector() {
	global $colors;
	$module = "<label for=\"bg-color-selector\">Hatterszin</label><br /><select id=\"bg-color-selector\" name=\"bg-color-selector\" onchange=\"changeBgColor(this)\">";
		foreach($colors as $color) {
			$module .= "<option name=\"$color\" id=\"bg_$color\" class=\"bg-color-selector\" style=\"color: $color;\">$color</option>";
		}
	$module .= "</select>";
	return $module;
}
function colorSelector() {
	global $colors;
	$module = "<label for=\"color-selector\">Betuszin</label><br /><select id=\"color-selector\" name=\"color-selector\" onchange=\"changeColor(this)\">";
	foreach($colors as $color) {
		$module .= "<option name=\"$color\" id=\"font_$color\" class=\"font-color-selector\" style=\"color: $color;\">$color</option>";
	}
	$module .= "</select>";
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
		$module = "<ul>";
		while ($row = mysql_fetch_assoc($iList)) {
			$buttons = "<div class=\"image-bg\" onclick=\"setBgImage('$row[src]')\">Bg</div><div class=\"image-img\" onclick=\"insertImage('$row[src]')\">I</div>";
			$module .= "<li>$container<div class=\"image-name\">$row[name]</div>$buttons</div></li>";
		}
		$module .= "</ul>";
	return $module;
	}
}
?>

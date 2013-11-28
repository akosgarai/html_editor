<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';
require 'modules/background.php';
require 'modules/text.php';

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
if (isset($_GET["action"]) && $_GET["action"] == "upload") {
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
	$backgroundModule = backgroundModule();
	$textModule = new textModule;

		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', 'Save'));
		$smarty->assign('messages', $messages);
		$smarty->assign('backgroundModule', $backgroundModule);
		$smarty->assign('textModule', $textModule->createTextModule());
		if($pageContent == NULL){
			$smarty->assign('initScript', 'changescript("")');
		} else {
			$pageContent = htmlspecialchars_decode($pageContent);
			$smarty->assign('pageContent', $pageContent);
		}
		$smarty->display('template/editor_main.tpl');
}

function generateModuleContainer($moduleId, $moduletext) {
	$result = "<div class=\"module\" id=\"$moduleId\"><div class=\"modulname\" onclick=\"changeVisibility(this.parentNode.childNodes[1])\">$moduletext</div><div class=\"module-content-container\">";
	return $result;
}
function backgroundModule() {
	$module = generateModuleContainer("backgroundModule", "Hatter");
	$backgroundColor = backgroundColorSelector();
	$module .= $backgroundColor."<br />";
	$fontColor = colorSelector();
	$module .= $fontColor."<br />";
	$listIM = listImageModule();
	$module .= $listIM."<br />";
	$uploadIM = uploadImageModule();
	$module .= $uploadIM;
	$bgrepeat = backgroundRepeat();
	$module .= $bgrepeat;
	$bgpos = backgroundPosition();
	$module .= $bgpos;
	$module .= "</div></div>";
	return $module;
}
?>

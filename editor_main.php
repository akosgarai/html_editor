<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';
require 'modules/background.php';
require 'modules/text.php';
require 'modules/div.php';
header("X-XSS-Protection: 0");

class editorController {

	function construct($pageContent = NULL) {
		$smarty = new Smarty;
		global $messages;
		$backgroundModule = new backgroundModule;
		$textModule = new textModule;
		$boxModule = new boxModule;

		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', 'Save'));
		$smarty->assign('messages', $messages);
		$smarty->assign('createHHiddenMenu', $textModule->createHHiddenMenu());
		$smarty->assign('createListHiddenMenu', $textModule->createListHiddenMenu());
		$smarty->assign('backgroundModule', $backgroundModule->createBackgroundModule());
		$smarty->assign('textModule', $textModule->createTextModule());
		$smarty->assign('boxModule', $boxModule->createBoxModule());
		$smarty->assign('createDivHiddenMenu', $boxModule->createDivHiddenMenu());
		if($pageContent == NULL){
			$smarty->assign('initScript', 'changescript("")');
		} else {
			$pageContent = htmlspecialchars_decode($pageContent);
			$smarty->assign('pageContent', $pageContent);
		}
		$smarty->display('template/editor_main.tpl');
	}

	function init() {
		global $messages;
		if (array_key_exists("new_page", $_POST)) {		
			$this->construct();
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
			$this->construct(($_POST['savepage']));
		}
		if (array_key_exists("saved_pages", $_POST)) {
			$load = new editorModel();
			$conn = $load->connect();
			if ($conn != "OK") {
				addError($conn);
			}
			$l = $load->loadPage($_POST['saved_pages']);
			$row = mysql_fetch_assoc($l);
		//var_dump($row);
			$this->construct($row[page_content]);
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
		//var_dump($_POST);
			$this->construct($_POST["saveEditorContent"]);
		}
	}
}
$editorController = new editorController();
$editorController->init();
?>


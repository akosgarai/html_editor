<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';

class indexPage {
	public $additionalModule;
	function listSavedPagesModule($queryResult) {
		$module = "<form method=\"post\" action=\"editor_main.php\" name=\"loadPage\" id=\"loadPage\">";
		$module .= "<select id=\"saved_pages\" name=\"saved_pages\" onchange=\"index.preview()\">";
		while ($row = mysql_fetch_assoc($queryResult)) {
			$module .= "<option name=$row[page_id]>$row[page_id]</option>";
		}
		$module .= "</select><input type=\"submit\" name=\"submit\" /></form>";
		return $module;
	}
	function selectToReleaseModule($queryResult) {
		$module = "<form method=\"post\" action=\"index.php\" name=\"releasePage\" id=\"releasePage\">";
		$module .= "<select id=\"saved_pages_release\" name=\"saved_pages_release\">";
		while ($row = mysql_fetch_assoc($queryResult)) {
			$module .= "<option name=$row[page_id]>$row[page_id]</option>";
		}
		$module .= "</select><input type=\"submit\" name=\"submit\" /></form>";
		return $module;
	}
	function construct() {
		global $messages;
		$smarty1 = new Smarty;
		$smarty1->assign('title', 'HTML Editor');
		$smarty1->assign('buttons', array('New', 'Load', 'Realease'));
		$smarty1->assign('additionalModule', $this->additionalModule);
		$smarty1->assign('messages', $messages);
		$smarty1->display('template/index.tpl');
	}
}
	function init() {
		$page = new indexPage();
		$load = new editorModel();
		$conn = $load->connect();
		if ($conn != "OK") {
			addError($conn);
		}
		$s = $load->getSavedPages();
		if (isErrorMessage($s)) {
			addError($s);
		} else {
			$page->additionalModule = $page->listSavedPagesModule($s);
		}
		if (array_key_exists("saved_pages_release", $_POST)) {
			$release = new editorModel();
			$conn = $release->connect();
			if (isErrorMessage($conn)) {
				addError($conn);
			}
			$l = $release->releasePage($_POST['saved_pages_release']);
			if (isErrorMessage($l)) {
				addError($l);
			} else {
				addMessage($l);
			}
		}
		$page->construct();
	}
	init();
?>

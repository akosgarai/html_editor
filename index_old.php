<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';

$savedPages;
$releasePage;
if (array_key_exists("load_page", $_POST) || array_key_exists("realease_page", $_POST)) {
	$load = new editorModel();
	$conn = $load->connect();
	if ($conn != "OK") {
		addError($conn);
	}
	$s = $load->getSavedPages();
	if (substr($s, 0, 5) == "ERROR") {
		addError($s);
	} else {
		if (array_key_exists("load_page", $_POST)){
			$savedPages = listSavedPagesModule($s);
		} else if (array_key_exists("realease_page", $_POST)) {
			$savedPages = selectToReleaseModule($s);
		}
	}
}
if (array_key_exists("saved_pages_release", $_POST)) {
	$release = new editorModel();
	$conn = $release->connect();
	if ($conn != "OK") {
		addError($conn);
	}
		$l = $release->releasePage($_POST['saved_pages_release']);
//	$l = $_POST['saved_pages_release'];
	//$l = "LOSZAR";
	$releasePage = $l;
}
function listSavedPagesModule($queryResult) {
	$module = "<form method=\"post\" action=\"editor_main.php\" name=\"loadPage\" id=\"loadPage\">";
	$module .= "<select id=\"saved_pages\" name=\"saved_pages\">";
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
function init() {
	global $savedPages;
	global $messages;
	global $releasePage;
	$smarty1 = new Smarty;
	$smarty1->assign('title', 'HTML Editor');
	$smarty1->assign('buttons', array('New', 'Load', 'Realease'));
	$smarty1->assign('savedPages', $savedPages);
	$smarty1->assign('messages', $messages);
	$smarty1->assign('tmp', $releasePage);
	$smarty1->display('template/index.tpl');
}
init();
?>


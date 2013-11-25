<?php
require 'smarty/libs/Smarty.class.php';
require 'editorModel.php';
require 'common.php';

$savedPages;
if (array_key_exists("load_page", $_POST)) {
	$load = new editorModel();
	$conn = $load->connect();
	if ($conn != "OK") {
		addError($conn);
	}
	$s = $load->getSavedPages();
	if (substr($s, 0, 5) == "ERROR") {
		addError($s);
	} else {
		$savedPages = listSavedPagesModule($s);
	}
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
function init() {
	global $savedPages;
	global $errors;
	$smarty1 = new Smarty;
	$smarty1->assign('title', 'HTML Editor');
	$smarty1->assign('buttons', array('New', 'Load'));
	$smarty1->assign('savedPages', $savedPages);
	$smarty1->assign('errors', $errors);
	$smarty1->display('template/index.tpl');

}
init();
?>

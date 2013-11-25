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
function selector($pageContent = NULL) {
	$smarty = new Smarty;
	global $errors;
	$bgColorSelectorModule = backgroundColorSelector();
	$fontColorSelectorModule = colorSelector();
		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', 'Save'));
		$smarty->assign('pageContent', $pageContent);
		$smarty->assign('bgColorSelectorModule', $bgColorSelectorModule);
		$smarty->assign('fontColorSelectorModule', $fontColorSelectorModule);
		$smarty->assign('errors', $errors);
		if($pageContent == NULL){
			$smarty->assign('initScript', 'changescript("")');
		} else {
			$pageContent = str_replace('quot;', '', $pageContent);
			$smarty->assign('initScript', 'changescript("'.$pageContent.'")');
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
?>

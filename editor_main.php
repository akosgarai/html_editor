<?php
require 'smarty/libs/Smarty.class.php';

$colors = array('red', 'green', 'blue', 'yellow', 'black', 'white', 'brown', 'chartreuse', 'chocolate', 'orange', 'gold');

function selector($pageContent = NULL) {
	$smarty = new Smarty;
	$bgColorSelectorModule = backgroundColorSelector();
	$fontColorSelectorModule = colorSelector();
		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', ));
		$smarty->assign('pageContent', $pageContent);
		$smarty->assign('bgColorSelectorModule', $bgColorSelectorModule);
		$smarty->assign('fontColorSelectorModule', $fontColorSelectorModule);
		if($pageContent == NULL){
			$smarty->assign('initScript', 'changescript("")');
		}
		$smarty->display('template/editor_main.tpl');
}
if (array_key_exists("new_page", $_POST)) {		
	selector();
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

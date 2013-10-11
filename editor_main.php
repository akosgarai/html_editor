<?php
require 'smarty/libs/Smarty.class.php';

function selector() {
	$smarty = new Smarty;
		$smarty->assign('title', 'HTML Editor');
		$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
		$smarty->assign('menus', array('HTML', 'Tag Cont', ));
		$smarty->display('template/editor_main.tpl');
}
if (array_key_exists("new_page", $_POST)) {		
	selector();
}
?>


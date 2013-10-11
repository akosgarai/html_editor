<?php
require 'smarty/libs/Smarty.class.php';

function init() {
	$smarty1 = new Smarty;
	$smarty1->assign('title', 'HTML Editor');
	$smarty1->assign('buttons', array('New', 'Load'));
	$smarty1->display('template/index.tpl');

}
init();
?>

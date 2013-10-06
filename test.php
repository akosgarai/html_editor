<?php
require 'smarty/libs/Smarty.class.php';

$smarty = new Smarty;

$smarty->assign('title', 'HTML Editor');
$smarty->assign('main_screen', 'Ez itt a html editor kezdokepernyoje.');
$smarty->assign('menus', array('HTML', 'Tag Cont', ));
$smarty->display('template/test.tpl');
?>

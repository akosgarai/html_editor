<?php
$errors = "";
function addError($error) {
	global $errors;
	$newError = "<span class=\"error\">".$error."</span>";
  $errors .= $newError;
}
?>

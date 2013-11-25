<?php
$messages = "";
function addError($error) {
	global $messages;
	$newError = "<span class=\"error\">".$error."</span>";
  $messages .= $newError;
}
function addMessage($message) {
	global $messages;
	$newMessage = "<span class=\"message\">".$message."</span>";
  $messages .= $newMessage;
}
?>

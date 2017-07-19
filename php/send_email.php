<?php
header('Content-type: application/json');

$to_name = 'Bartosz Szopiera';
$to_address = 'bartosz.szopiera@gmail.com';
$from_name = $_POST['from_name'];
$from_address = $_POST['from_address'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$header = 'From: ' . $from_address;

if (mail($to_address, $subject, $message, $header)) {
  $response['msg'] = 'E-mail sent.';
}
else {
  $response['msg'] = 'Sending e-mail failed. Error: \n' . error_get_last()['message'];
  die (json_encode($response));
}

// if (isset($_POST['send_copy'])){
//
// }

echo json_encode($response);
?>

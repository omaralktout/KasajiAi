<?php
declare(strict_types=1);
header('Content-Type: text/plain; charset=utf-8');

ini_set('display_errors', '1');
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* ==========================
   Microsoft 365 SMTP
   ========================== */
$MAIL_HOST     = 'smtp.office365.com';
$MAIL_PORT     = 587; // STARTTLS
$MAIL_USERNAME = 'mail@kasaji.ai';           // جرّب تغيّرها لــ UPN الفعلي إذا كان مختلف
$MAIL_PASSWORD = '';         // بس مؤقتًا للاختبار
$MAIL_FROM     = 'mail@kasaji.ai';
$MAIL_FROMNAME = 'Website';
$MAIL_TO       = 'mail@kasaji.ai';

/* ================ */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); echo 'METHOD_NOT_ALLOWED'; exit; }
if (!empty($_POST['company'])) { http_response_code(200); echo 'OK'; exit; } // honeypot

$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
  http_response_code(422); echo 'INVALID'; exit;
}

try {
  $mail = new PHPMailer(true);

  // فعّل لوج مؤقت (بتشوفه مباشرة في الاستجابة):
  $mail->SMTPDebug   = 2;
  $mail->Debugoutput = 'html';

  // SMTP
  $mail->isSMTP();
  $mail->Host       = $MAIL_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $MAIL_USERNAME;
  $mail->Password   = $MAIL_PASSWORD;
  $mail->CharSet    = 'UTF-8';
  $mail->Timeout    = 20;

  // STARTTLS على 587
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 'tls' برضه بيمشي
  $mail->Port       = $MAIL_PORT;

  // المرسل/المستلم
  $mail->setFrom($MAIL_FROM, $MAIL_FROMNAME);
  $mail->addAddress($MAIL_TO, 'Inbox');
  if ($email !== '') { $mail->addReplyTo($email, $name); }

  // المحتوى
  $mail->isHTML(true);
  $mail->Subject = 'Landing contact';
  $mail->Body =
    '<p><b>Name:</b> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>Email:</b> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>Message:</b><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>';
  $mail->AltBody = "Name: $name\nEmail: $email\n\n$message";

  $ok = $mail->send();
  if ($ok) {
    http_response_code(200);
    echo 'OK';
  } else {
    http_response_code(500);
    echo 'ERROR: ' . $mail->ErrorInfo;
  }
} catch (Exception $e) {
  http_response_code(500);
  echo 'ERROR: ' . ($mail->ErrorInfo ?? $e->getMessage());
}

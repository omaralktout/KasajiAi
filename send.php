<?php
// send.php
declare(strict_types=1);
header('Content-Type: text/plain; charset=utf-8');

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* =======================
   SMTP SETTINGS (Gmail)
   ======================= */
$MAIL_HOST     = 'smtp.gmail.com';
$MAIL_PORT     = 587; // بدّل لـ 465 إن استخدمت ssl
$MAIL_USERNAME = 'omaralktout1237@gmail.com';
$MAIL_PASSWORD = 'vnjaaldghlhfjust'; // App Password (16 خانة بدون فراغات)
$MAIL_FROM     = 'omaralktout1237@gmail.com';
$MAIL_FROMNAME = 'Website';
$MAIL_TO       = 'omaralktout1237@gmail.com';

/* ================
   BASIC GUARDS
   ================ */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); echo 'METHOD_NOT_ALLOWED'; exit; }
if (!empty($_POST['company'])) { http_response_code(200); echo 'OK'; exit; } // honeypot

$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
  http_response_code(422); echo 'INVALID'; exit;
}

try {
  // أنشئ الكائن أولاً
  $mail = new PHPMailer(true);

  // (اختياري للتشخيص المؤقت)
  // $mail->SMTPDebug  = 2;
  // $mail->Debugoutput = 'error_log';

  // إعداد SMTP
  $mail->isSMTP();
  $mail->Host       = $MAIL_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $MAIL_USERNAME;
  $mail->Password   = $MAIL_PASSWORD;
  $mail->CharSet    = 'UTF-8';
  $mail->Timeout    = 15;

  // تشفير + منفذ (TLS/587 الافتراضي مع Gmail)
  $mail->SMTPSecure = 'tls';
  $mail->Port       = $MAIL_PORT;
  // لو بدك SSL/465:
  // $mail->SMTPSecure = 'ssl';
  // $mail->Port       = 465;

  // المرسل/المستلم
  $mail->setFrom($MAIL_FROM, $MAIL_FROMNAME);
  $mail->addAddress($MAIL_TO, 'Inbox');
  $mail->addReplyTo($email, $name);

  // المحتوى
  $mail->isHTML(true);
  $mail->Subject = 'Landing contact';
  $mail->Body    =
    '<p><b>Name:</b> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>Email:</b> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>Message:</b><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>';
  $mail->AltBody = "Name: $name\nEmail: $email\n\n$message";

  $mail->send();
  http_response_code(200);
  echo 'OK';
} catch (Exception $e) {
  error_log('[MAILER] ' . ($mail->ErrorInfo ?? $e->getMessage()));
  http_response_code(500);
  echo 'ERROR';
}

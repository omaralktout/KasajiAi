<?php
declare(strict_types=1);
header('Content-Type: text/plain; charset=utf-8');

ini_set('display_errors', '0');   // بالإنتاج خليه 0
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* ==========================
   إعدادات Gmail (ثابتة)
   ========================== */
// الإيميل الذي تستقبل عليه الرسائل:
$SITE_OWNER_EMAIL = 'Mailkasaji.ai@gmail.com';

// حساب الجيميل المُرسِل (خليه نفس اللي فوق عادةً):
$GMAIL_ADDRESS  = 'Mailkasaji.ai@gmail.com';
// App Password من Google (16 خانة بدون مسافات):
$GMAIL_APP_PASS = 'szdfzpqytdgbfluf';

$MAIL_HOST = 'smtp.gmail.com';
$MAIL_PORT = 587;

/* ================ تحقق المدخلات ================ */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405); echo 'METHOD_NOT_ALLOWED'; exit;
}

// honeypot لمنع السبام
if (!empty($_POST['company'])) { http_response_code(200); echo 'OK'; exit; }

$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
  http_response_code(422); echo 'INVALID'; exit;
}

/* معلومات إضافية */
$ip        = $_SERVER['REMOTE_ADDR']     ?? '';
$agent     = $_SERVER['HTTP_USER_AGENT'] ?? '';
$referer   = $_SERVER['HTTP_REFERER']    ?? '';
$submitted = date('Y-m-d H:i:s');

try {
  // رسالة لصاحب الموقع
  $owner = new PHPMailer(true);
  $owner->isSMTP();
  $owner->Host       = $MAIL_HOST;
  $owner->SMTPAuth   = true;
  $owner->Username   = $GMAIL_ADDRESS;
  $owner->Password   = $GMAIL_APP_PASS;
  $owner->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $owner->Port       = $MAIL_PORT;
  $owner->CharSet    = 'UTF-8';
  $owner->Timeout    = 20;

  $owner->setFrom($GMAIL_ADDRESS, 'Website');
  $owner->addAddress($SITE_OWNER_EMAIL, 'Inbox');
  $owner->addReplyTo($email, $name);

  $owner->isHTML(true);
  $owner->Subject = '🆕 [New Contact] رسالة جديدة من الموقع';
  $owner->Body =
    '<h3>رسالة جديدة من الفورم</h3>' .
    '<p><b>الاسم:</b> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>الإيميل:</b> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>' .
    '<p><b>الرسالة:</b><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>' .
    '<hr>' .
    '<p style="font-size:12px;color:#666">' .
      'Submitted: ' . $submitted . '<br>' .
      'IP: ' . htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') . '<br>' .
      'UA: ' . htmlspecialchars($agent, ENT_QUOTES, 'UTF-8') . '<br>' .
      'Referrer: ' . htmlspecialchars($referer, ENT_QUOTES, 'UTF-8') .
    '</p>';
  $owner->AltBody = "New contact message\nName: $name\nEmail: $email\n\n$message\n\n[$submitted | IP:$ip]";

  if (!$owner->send()) {
    http_response_code(500); echo 'ERROR: ' . $owner->ErrorInfo; exit;
  }

  // (اختياري) إقرار استلام للزائر — إذا مش بدك إياه احذف هذا البلوك كله
  $ack = new PHPMailer(true);
  $ack->isSMTP();
  $ack->Host       = $MAIL_HOST;
  $ack->SMTPAuth   = true;
  $ack->Username   = $GMAIL_ADDRESS;
  $ack->Password   = $GMAIL_APP_PASS;
  $ack->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $ack->Port       = $MAIL_PORT;
  $ack->CharSet    = 'UTF-8';
  $ack->Timeout    = 20;

  $ack->setFrom($GMAIL_ADDRESS, 'Kasaji Team');
  $ack->addAddress($email, $name);
  $ack->isHTML(true);
  $ack->Subject = '✅ تم استلام رسالتك';
  $ack->Body =
    '<p>مرحبًا ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ',</p>' .
    '<p>تم استلام رسالتك بنجاح وسنقوم بالرد عليك قريبًا.</p>' .
    '<blockquote style="border-left:4px solid #ddd;padding-left:10px;color:#555">' .
    nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) .
    '</blockquote>' .
    '<p>تحياتنا،<br>Kasaji Team</p>';
  $ack->AltBody = "Hi $name,\nWe received your message and will reply soon.\n\n---\n$message\n\nKasaji Team";
  try { $ack->send(); } catch (Exception $e) { /* تجاهل خطأ الإقرار */ }

  http_response_code(200); echo 'OK';
} catch (Exception $e) {
  http_response_code(500);
  echo 'ERROR: ' . $e->getMessage();
}

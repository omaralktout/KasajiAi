<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

/* إعداد أمان اختياري */
$VERIFY_TOKEN_HEADER = 'X-Webhook-Token';
$VERIFY_TOKEN        = getenv('WEBHOOK_TOKEN') ?: ''; // إن حبيت سر مشترك
$INBOX_DIR           = __DIR__ . '/inbox';

/* دعم GET للتحقق */
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
  $challenge = $_GET['challenge'] ?? '';
  if ($challenge !== '') { echo json_encode(['challenge' => (string)$challenge]); exit; }
  echo json_encode(['status' => 'ok']); exit;
}

/* فقط POST */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405); echo json_encode(['error'=>'METHOD_NOT_ALLOWED']); exit;
}

/* تحقق من التوكن (اختياري) */
if ($VERIFY_TOKEN !== '') {
  $hdr = $_SERVER['HTTP_' . str_replace('-', '_', strtoupper($VERIFY_TOKEN_HEADER))] ?? '';
  if (!$hdr || !hash_equals($VERIFY_TOKEN, $hdr)) {
    http_response_code(401); echo json_encode(['error'=>'UNAUTHORIZED']); exit;
  }
}

/* قراءة البودي */
$ct  = $_SERVER['CONTENT_TYPE'] ?? '';
$raw = file_get_contents('php://input') ?: '';
$in  = (stripos($ct, 'application/json') !== false) ? json_decode($raw, true) : $_POST;
if (!is_array($in)) { http_response_code(400); echo json_encode(['error'=>'BAD_PAYLOAD']); exit; }

/* حقول شائعة */
$session = trim((string)($in['session'] ?? $in['session_id'] ?? $in['conversation'] ?? 'default'));
$from    = trim((string)($in['from'] ?? $in['sender'] ?? 'partner'));
$message = trim((string)($in['message'] ?? $in['text'] ?? $in['reply'] ?? ''));

if (!is_dir($INBOX_DIR)) { @mkdir($INBOX_DIR, 0775, true); }
$record = [
  'ts'      => date('c'),
  'session' => $session,
  'from'    => $from,
  'message' => ($message !== '' ? $message : '[no message]'),
  'raw'     => $in,
];
@file_put_contents($INBOX_DIR . "/{$session}.jsonl", json_encode($record, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

/* رد سريع مهم للمزوّد */
echo json_encode(['status' => 'ok']);

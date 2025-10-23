<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

/* عيّن Send URL اللي عطاك إياه */
$SEND_URL    = 'https://hooks.partner.com/c2a94250-29a1-4a0d-ab24-c6aa76ba6b32/chat';
$SEND_METHOD = 'GET'; // خليه GET لأن المسار المسجّل عندهم GET

$SEND_TIMEOUT_SEC = 10;
/* لو عندهم API Key (اختياري) */
$SEND_API_KEY        = getenv('SEND_API_KEY') ?: '';
$SEND_API_KEY_HEADER = getenv('SEND_API_KEY_HEADER') ?: 'X-Api-Key';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405); echo json_encode(['error'=>'METHOD_NOT_ALLOWED']); exit;
}

$ct  = $_SERVER['CONTENT_TYPE'] ?? '';
$raw = file_get_contents('php://input') ?: '';
$in  = (stripos($ct, 'application/json') !== false) ? json_decode($raw, true) : $_POST;

if (!is_array($in)) { http_response_code(400); echo json_encode(['error'=>'BAD_PAYLOAD']); exit; }
$event   = (string)($in['event'] ?? '');
$text    = trim((string)($in['text'] ?? ''));
$session = trim((string)($in['session'] ?? 'default'));

if ($event !== 'chat.message' || $text === '') {
  http_response_code(422); echo json_encode(['error'=>'INVALID_INPUT']); exit;
}

/* نرسل GET مع text و session */
$qs   = http_build_query(['text'=>$text,'session'=>$session], encoding_type: PHP_QUERY_RFC3986);
$url  = (str_contains($SEND_URL,'?') ? $SEND_URL.'&' : $SEND_URL.'?') . $qs;

$ch = curl_init();
$headers = ['Accept: application/json','User-Agent: Kasaji-Sender/1.0'];
if ($SEND_API_KEY !== '') $headers[] = $SEND_API_KEY_HEADER . ': ' . $SEND_API_KEY;

curl_setopt_array($ch, [
  CURLOPT_URL => $url,
  CURLOPT_HTTPGET => true,
  CURLOPT_HTTPHEADER => $headers,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CONNECTTIMEOUT => $SEND_TIMEOUT_SEC,
  CURLOPT_TIMEOUT => $SEND_TIMEOUT_SEC,
]);
$body  = curl_exec($ch);
$errno = curl_errno($ch);
$err   = curl_error($ch);
$code  = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

/* ما بنعتمد على هذا الرد كجواب للمستخدم—الرد الحقيقي يجي عبر webhook لاحقًا */
if ($errno !== 0) {
  http_response_code(502); echo json_encode(['status'=>'sent','upstream'=>'error','detail'=>$err]); exit;
}
echo json_encode(['status'=>'sent','upstream_http'=>$code], JSON_UNESCAPED_UNICODE);

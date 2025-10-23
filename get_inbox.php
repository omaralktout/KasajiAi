<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

$INBOX_DIR = __DIR__ . '/inbox';
$session   = trim((string)($_GET['session'] ?? 'default'));
$sinceTs   = trim((string)($_GET['since'] ?? '')); // ISO timestamp اختياري لتقليل النتائج

$file = $INBOX_DIR . "/{$session}.jsonl";
if (!is_file($file)) { echo json_encode(['messages'=>[]]); exit; }

$messages = [];
$fh = fopen($file, 'r');
if ($fh) {
  while (($line = fgets($fh)) !== false) {
    $row = json_decode($line, true);
    if (!is_array($row)) continue;
    if ($sinceTs !== '' && isset($row['ts']) && strcmp($row['ts'], $sinceTs) <= 0) continue;
    $messages[] = [
      'ts'      => $row['ts'] ?? '',
      'from'    => $row['from'] ?? 'partner',
      'message' => $row['message'] ?? '',
    ];
  }
  fclose($fh);
}
echo json_encode(['messages'=>$messages], JSON_UNESCAPED_UNICODE);

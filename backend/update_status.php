<?php
$nickname = $_POST['nickname'];
$statusBaru = $_POST['status'];

$filePath = "../data/data.json";
$data = json_decode(file_get_contents($filePath), true);

// Cari dan update status berdasarkan nickname
foreach ($data as &$transaksi) {
  if ($transaksi['nickname'] === $nickname) {
    $transaksi['status'] = $statusBaru;
    break;
  }
}

// Simpan update ke file JSON
file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));

// Redirect ke halaman utama
header("Location: ../index.html");
exit();
?>
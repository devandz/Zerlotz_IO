<?php
// Ambil data dari form
$nickname = $_POST['nickname'];
$game = $_POST['game'];
$item = $_POST['item'];
$metode = $_POST['metode'];

$dataBaru = [
  "nickname" => $nickname,
  "game" => $game,
  "item" => $item,
  "metode" => $metode,
  "status" => "pending",
  "tanggal" => date("Y-m-d H:i:s")
];

// Baca isi file JSON
$filePath = "../data/data.json";
$data = json_decode(file_get_contents($filePath), true);

// Tambahkan transaksi baru
$data[] = $dataBaru;

// Simpan ke file JSON
file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));

// Redirect balik ke halaman utama
header("Location: ../index.html");
exit();
?>
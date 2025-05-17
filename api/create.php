<?php
date_default_timezone_set('Asia/Jakarta');

include_once "../config/database.php";

$suhu = $_POST['suhu'];
$kelembaban = $_POST['kelembaban'];

$query = "INSERT INTO data (suhu, kelembaban) VALUES ($suhu, $kelembaban)";
$result = mysqli_query($conn, $query);

if ($result) {
    echo "Berhasil Tersimpan ke Database";
} else {
    echo "Gagal Tersimpan ke Database";
}

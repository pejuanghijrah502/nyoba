<?php
date_default_timezone_set('Asia/Jakarta');

include_once "../config/database.php";

$query = "SELECT * FROM (SELECT * FROM data ORDER BY waktu DESC LIMIT 30) AS sub ORDER BY waktu ASC";
$result = mysqli_query($conn, $query);

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = array(
        'waktu' => date('Y-m-d H:i:s', strtotime($row['waktu'])), // waktu Jakarta
        'suhu' => $row['suhu'],
        'kelembaban' => $row['kelembaban']
    );
}

header('Content-Type: application/json');
echo json_encode($data);
?>

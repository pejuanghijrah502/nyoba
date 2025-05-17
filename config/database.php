<?php
$host   = "localhost";
$user   = "u114562531_ruangserver";
$pass   = "IoT_t3st1ng";
$db     = "u114562531_ruangserver";

$conn = mysqli_connect($host,$user,$pass,$db);

if(!$conn){
    echo "Gagal Terhubung ke Database";
}

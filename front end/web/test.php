<?php

$name = $_POST["name"];
$username = $_POST["username"];
$password = $_POST["password"];
$type = $_POST["type"];

echo "name: ".$name." username is ".$username." password is ".$password." type is ".$type;

$conn = new \mysqli('127.0.0.1:3306', 'root', 'password', 'instructus');
if ($conn->connect_error) {
    die("connection failed :".$conn->connect_error);
} else {
    $stmt = $conn->prepare("insert into user(name, username, password, type) values(?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $username, $password, $type);
    $stmt->close();
    $conn->close();
}




?>
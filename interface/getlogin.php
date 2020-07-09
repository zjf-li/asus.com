<?php
    include('./conn.php');
    $username = $_REQUEST['name'];
    $password = $_REQUEST['pass'];
    // 查询前端传来的账号和密码

   
    $sql = "select * from vip where user_name='$username'and user_pass='$password'";

 
    
    $res = $mysqli->query($sql);
    if($res->num_rows>0){
        echo 1;
    }else{
        echo 0;
  
    }

    $mysqli->close();
?>
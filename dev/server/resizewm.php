<?php

$dir = 'cache';
if (!file_exists($dir)) mkdir($dir);

$bg = $_POST['bg'];
$sizebg = $_POST['sizebg'];
$wm = $_POST['wm'];

$imgbg = getimagesize($bg);
$imgwm = getimagesize($wm);

$width = $imgbg[0];

//echo $width.' x '.$sizebg;

$ratio = $width / $sizebg;

$w = $imgwm[0]; $wr = $w / $ratio;
$h = $imgwm[1]; $hr = $h / $ratio;

//echo $w.' x '.$h."\n".$wr.' x '.$hr."\n".$ratio."\n";

$mime = $imgwm['mime'];
if ($mime == 'image/jpeg') { 
    $name = $dir.'/'.time().'_'.mt_rand(100000,199999).'.jpg';
    $im = imagecreatefromjpeg($wm);
} else {
    $name = $dir.'/'.time().'_'.mt_rand(100000,199999).'.png';
    $im = imagecreatefrompng($wm);
}

$im2 = imagecreatetruecolor($wr,$hr);
imagecopyresampled($im2, $im, 0, 0, 0, 0, $wr, $hr, $w, $h);
if ($mime == 'image/jpeg') {
    imagejpeg($im2, $name);
} else {
    imagepng($im2, $name);
}

echo '{"url":"http://'.$_SERVER['HTTP_HOST'].'/server/'.$name.'","ratio":'.$ratio.'}';

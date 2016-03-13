<?php

function GetImgResize($mx,$my,$nx,$ny,&$gx,&$gy)
{
    $x = round(($mx*$ny)/$my);
    $y = round(($my*$nx)/$mx);
    if ($x<=$nx) { $gx=$x; $gy=$ny; }
        else { $gx=$nx; $gy=$y; }
}

$dir = 'cache';
if (!file_exists($dir)) mkdir($dir);

$bg = $_POST['bg'];
$sizebg = $_POST['sizebg'];
$wm = $_POST['wm'];

$imgbg = getimagesize($bg);
$imgwm = getimagesize($wm);

$width = $imgbg[0];
$height = $imgbg[1];

$widthwm = $imgwm[0];
$heightwm = $imgwm[1];

if ($widthwm > $width || $heightwm > $height) {

    GetImgResize($widthwm, $heightwm, $width, $height, $gx, $gy);

    $mime = $imgwm['mime'];
    if ($mime == 'image/jpeg') { 
        $name = $dir.'/'.time().'_'.mt_rand(100000,199999).'.jpg';
        $im = imagecreatefromjpeg($wm);
    } else {
        $name = $dir.'/'.time().'_'.mt_rand(100000,199999).'.png';
        $im = imagecreatefrompng($wm);
    }

    $im2 = imagecreatetruecolor($gx, $gy);
    imageSaveAlpha($im2, true);
    imagecopyresampled($im2, $im, 0, 0, 0, 0, $gx, $gy, $widthwm, $heightwm);
    if ($mime == 'image/jpeg') {
        imagejpeg($im2, $name);
    } else {
        imagepng($im2, $name);
    }

    echo '{"url":"http://'.$_SERVER['HTTP_HOST'].'/server/'.$name.'","ratio":"1"}';

} else {

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
    imageSaveAlpha($im2, true);
    imagecopyresampled($im2, $im, 0, 0, 0, 0, $wr, $hr, $w, $h);
    if ($mime == 'image/jpeg') {
        imagejpeg($im2, $name);
    } else {
        imagepng($im2, $name);
    }

    echo '{"url":"http://'.$_SERVER['HTTP_HOST'].'/server/'.$name.'","ratio":'.$ratio.'}';
}
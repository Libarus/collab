<?php

//echo '<pre>'; print_r($_POST);echo '</pre>';

foreach ($_POST as $key => $value) {
    $$key = $value;
}

$img1 = getimagesize($img_background);
$img2 = getimagesize($img_watermark);

$mime1 = $img1['mime'];
$mime2 = $img2['mime'];

if ($mime1 != 'image/jpeg' &&
    $mime1 != 'image/png' &&
    $mime2 != 'image/jpeg' &&
    $mime2 != 'image/png'
    ) {

    echo '<b style="color:red;">Ошибка! Неверный формат файлов!</b>';

} else {

    $name = time().'_'.mt_rand(100000,199999).$ext;

    // размеры первой картинки
    $w1 = $img1[0]; $h1 = $img1[1];

    // размеры второй картинки
    $w2 = $img2[0]; $h2 = $img2[1];

    if ($mime1 == 'image/jpeg') $im1 = imagecreatefromjpeg($img_background); else $im1 = imagecreatefrompng($img_background);
    if ($mime2 == 'image/jpeg') $im2 = imagecreatefromjpeg($img_watermark); else $im2 = imagecreatefrompng($img_watermark);

    $mode = ($switch_item_type == 'tile' ? 1 : 0);

    if ($mode == 0) {

        $x = $spinnerX * $ratio;
        $y = $spinnerY * $ratio;
        imagecopymerge($im1,$im2,$x,$y,0,0,$w2,$h2,$opacity);

    } elseif ($mode == 1) {

        $tempX = $spinnerX * $ratio;
        $y = $spinnerY * $ratio;
        $padX = $spinnerHor * $ratio;
        $padY = $spinnerVert * $ratio;
        do {
            $x = $tempX;
            do {
                imagecopymerge($im1,$im2,$x,$y,0,0,$w2,$h2,$opacity);
                $x += $w2 + $padX;
            } while($x < $w1 + $w2);
            $y += $h2 + $padY;
        } while($y < $h1 + $h2);

    }

    header('Content-Type: image/jpg');
    imagejpeg($im1);

}

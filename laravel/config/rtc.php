<?php

$path = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.'rtckeys'.DIRECTORY_SEPARATOR;
return [

    /*
    |--------------------------------------------------------------------------
    | rtc
    |--------------------------------------------------------------------------
    */
    'appid' => env('TRTC_APPID', ''),
    'private_key' => file_get_contents($path.'private_key'),
    'public_key' => file_get_contents($path.'public_key'),
];

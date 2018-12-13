<?php

/**
 * api接口数据格式.
 *
 * @param        $value
 * @param number $code
 * @param string $message
 *
 * @return array
 */
function apiResponse($value='', $message='', $code=200)
{
    $res = [
        'code' => $code,
        'data' => $value,
        'message' => $message,
    ];

    return $res;
}

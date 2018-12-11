<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'App\Http\Controllers\Api'], function($api) {
    $api->post('webapp/login', 'AuthorizationsController@weappLogin')->name('api.webapp.login');
});

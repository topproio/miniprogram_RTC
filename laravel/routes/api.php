<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'App\Http\Controllers\Api'], function($api) {
    $api->post('webapp/login', 'AuthorizationsController@weappLogin')->name('api.webapp.login');

    $api->group(['middleware' => 'api.auth'], function ($api) {
	    $api->get('users/search', 'UsersController@search')->name('api.users.search');
        $api->post('users/create', 'UsersController@create')->name('api.users.create');
        $api->get('users', 'UsersController@index')->name('api.users.index');

        $api->get('rtc/sig', 'RTCController@GetRTCSig')->name('api.rtc.sig');
        $api->get('rtc/friendsig', 'RTCController@GetRTCFriendSig')->name('api.rtc.friendsig');
    });
});

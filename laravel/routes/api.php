<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'App\Http\Controllers\Api'], function($api) {
    $api->post('webapp/login', 'AuthorizationsController@weappLogin')->name('api.webapp.login');

    $api->group(['middleware' => 'api.auth'], function ($api) {
	    $api->get('users/search', 'UsersController@search')->name('api.users.search');
        $api->post('users/create', 'UsersController@create')->name('api.users.create');
        $api->get('users', 'UsersController@index')->name('api.users.index');

        $api->post('template/call', 'WeappTemplate@callMessage')->name('api.template.call');
    });
});

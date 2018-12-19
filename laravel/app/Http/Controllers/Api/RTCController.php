<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\triat\WebRTCSigApi;
use Auth;

class RTCController extends Controller
{
	private $WebRTCSigApi;

	public function __construct()
	{
		$appId = config('rtc.appid');
		$privateKey = config('rtc.private_key');
		$publicKey = config('rtc.public_key');
    	$this->WebRTCSigApi = new WebRTCSigApi();
    	$this->WebRTCSigApi->setSdkAppid($appId);
    	$this->WebRTCSigApi->SetPrivateKey($privateKey);
    	$this->WebRTCSigApi->SetPublicKey($publicKey);
	}

    public function GetRTCSig(Request $request)
    {
    	$friendId = $request->friendId;
    	$userId = Auth::id();

    	$roomId = $userId.$friendId;

    	$userSig = $this->WebRTCSigApi->genUserSig($userId);
    	$privMapEncrypt = $this->WebRTCSigApi->genPrivMapEncrypt($userId, $roomId);

    	$ret = [
    		'userSig' => $userSig, 
    		'PrivMapEncrypt' => $privMapEncrypt,
    		'sdkappid' => config('rtc.appid'),
    		'roomId' => $roomId,
            'userId' => $userId
    	];

    	return $this->response->array( apiResponse($ret, 'success') );
    }

}

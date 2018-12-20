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
        $this->validate($request, [
            'friendId' => 'required|integer'
        ]);

    	$friendId = $request->friendId;
    	$userId = Auth::id();

    	$roomId = 12; //$userId.$friendId

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

    public function GetRTCFriendSig(Request $request)
    {
        $this->validate($request, [
            'targetId' => 'required|integer',
            'originId' => 'required|integer'
        ]);

        $userId = Auth::id();
        $targetId = $request->targetId;
        $originId = $request->originId;

        if (intval($userId) !== intval($targetId)) {
            return $this->response->array( apiResponse(['userId'=> $userId, 'targetId' => $targetId] , '当前用户没有权限访问', 500) );
        }

        $roomId = 12; //$originId.$targetId

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

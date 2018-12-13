<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SocialAuthorizationRequest;
use App\Models\User;
use Auth;

class AuthorizationsController extends Controller
{
    public function weappLogin(SocialAuthorizationRequest $request)
    {
    	$code = $request->code;

        // 根据 code 获取微信 openid 和 session_key
        $miniProgram = \EasyWeChat::miniProgram();
        $weappRet = $miniProgram->auth->session($code);

        // 如果结果错误，说明 code 已过期或不正确，返回 401 错误
        if (isset($weappRet['errcode'])) 
        {
            return $this->response->errorUnauthorized('code 不正确');
        }

        // 找到 openid 对应的用户
        $user = User::where('weapp_openid', $weappRet['openid'])->first();

        $attributes = [
        	'name' => $request->name,
        	'avatar' => $request->avatar,
        	'weapp_openid' => $weappRet['openid'],
        	'weixin_session_key' => $weappRet['session_key'],
        ];

        // 如果是新用户
        if (!$user) 
        {
        	$user = User::create($attributes);
        }
        // 如果不是新用户
        else 
        {
	        $user->update($attributes);
        }

        // 为对应用户创建 JWT
        $token = Auth::guard('api')->fromUser($user);
        return $this->response->array( apiResponse(['token' => $token]), 'success');
    }
}

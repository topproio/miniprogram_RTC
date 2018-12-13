<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class WeappTemplate extends Controller
{
    public function callMessage(Request $request, User $user)
    {
    	$friendId = $request['id'];
    	$formId = $request['formId'];

    	$friendInfo = $user->getUserById($friendId);
    	$friendOpenId = $friendInfo['weapp_openid'];

    	$miniProgram = \EasyWeChat::miniProgram();

    	$miniProgram->template_message->send([
		    'touser' => $friendOpenId,
		    'template_id' => 'bnrY8XqOxyOt3ySeO19f5K9K7oRszVymvANO80CO-NQ',
		    'page' => 'index',
		    'form_id' => $formId,
		    'data' => [
		        'keyword1' => 'VALUE',
		        'keyword2' => 'VALUE2',
		        'keyword3' => 'VALUE3',
		    ]
		]);

		return $this->response->array( apiResponse(['friendInfo' => $friendOpenId] , 'success'));
    }
}

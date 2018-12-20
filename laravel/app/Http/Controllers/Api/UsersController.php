<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function search(Request $request)
    {
    	$name = $request->name;
    	$userList = User::where('name', 'like', '%' . $name . '%')->simplePaginate(10);

    	return $this->response->array( apiResponse(['userList' => $userList], 'success') );
    }

    public function create(Request $request)
    {
    	$this->validate($request, [
            'id' => 'required'
        ]);

        $id = Auth::id();
        $friendId = $request['id'];

        $isSelf = $id === $friendId;
        if ($isSelf) {
            return $this->response->array( apiResponse(null, '不能加自己', 500));
        }

        $hasAdd = DB::table('users_friend')->where('friend_id', $friendId)->where('uid', $id)->exists();
    	if ($hasAdd) {
            return $this->response->array( apiResponse(null, '你已经添加过了', 500) );
        }

    	Auth::user()->UserFriends()->create([
    		'friend_id' => $friendId
    	]);

    	return $this->response->array( apiResponse(null, 'success') );
    }

    public function index(User $user)
    {
        $userFriends = Auth::user()->UserFriends()->get();

        $friendIdList = [];
        foreach ($userFriends as $item) {
            array_push($friendIdList, $item->friend_id);
        }

        $friendList = $user->getFriendListByids($friendIdList);

        return $this->response->array( apiResponse(['friendList' => $friendList] , 'success'));
    }
}

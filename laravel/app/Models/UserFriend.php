<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserFriend extends Model
{
	protected $table = 'users_friend';

	protected $fillable = [
	    'friend_id'
	];

    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }
}

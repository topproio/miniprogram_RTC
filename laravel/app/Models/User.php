<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Auth;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'weapp_openid', 'weixin_session_key'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'weixin_session_key', 'weapp_openid'
    ];

    // Rest omitted for brevity

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function UserFriends()
    {
        return $this->hasMany(UserFriend::class, 'uid');
    }

    public function getFriendListByids($ids)
    {
        return $this->whereIn('id', $ids)->get();
    }

    public function getUserById($id)
    {
        return $this->where('id', $id)->first();;
    }
}

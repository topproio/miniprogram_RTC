<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersFriendTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_friend', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('uid')->index()->unsigned()->comment('用户id');
            $table->integer('friend_id')->index()->unsigned()->comment('好友id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_friend');
    }
}

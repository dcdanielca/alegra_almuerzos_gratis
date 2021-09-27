<?php


namespace App\Models;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Purchase extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'purchases';


	protected $fillable = array('ingredient','quantity');

	protected $hidden = ['updated_at'];


}
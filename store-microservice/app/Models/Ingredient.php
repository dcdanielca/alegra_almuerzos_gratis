<?php


namespace App\Models;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Ingredient extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'ingredients';


	// Atributos que se pueden asignar de manera masiva.
	protected $fillable = array('name','quantity');

	protected $hidden = ['_id', 'updated_at'];
}
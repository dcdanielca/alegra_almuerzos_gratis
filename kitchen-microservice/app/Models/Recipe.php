<?php


namespace App\Models;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Recipe extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'recipes';


	// Atributos que se pueden asignar de manera masiva.
	protected $fillable = array('name', 'image', 'ingredients');

	protected $hidden = ['_id', 'updated_at'];
}
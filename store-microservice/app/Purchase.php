<?php


namespace App;


use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Purchase extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'purchases';

}
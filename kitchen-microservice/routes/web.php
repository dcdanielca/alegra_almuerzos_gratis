<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/recipes', 'RecipeController@index');

Route::post('/orders', 'OrderController@create');
Route::get('/orders/preparing', 'OrderController@orders_preparing');
Route::get('/orders/made', 'OrderController@orders_made');
Route::post('/orders/recipe', 'OrderController@choose_recipe');
Route::post('/orders/ingredients', 'OrderController@ingredients_order');
Route::post('/orders/prepare', 'OrderController@prepare_order');




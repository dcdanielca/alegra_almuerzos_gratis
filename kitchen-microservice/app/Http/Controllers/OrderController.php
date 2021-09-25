<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Recipe;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function orders_preparing()
    {
        return response()->json(['orders'=>Order::where('status', '=', "preparing")->get()], 200);
    }

    public function orders_made()
    {
        return response()->json(['orders'=>Order::where('status', '=', "made")->get()], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $order = Order::create(['status' => 'preparing', 'recipe' => NULL]);
        return response()->json($order, 201);
    }


    /**
     * Choose recipe to order
     *
     * @return \Illuminate\Http\Response
     */
    public function choose_recipe(Request $request)
    {
        $order = Order::findOrFail($request['id']);
        $recipe = Recipe::findOrFail($request['recipeId']);
        $order->recipeId = $recipe['_id'];
        $order->recipeName = $recipe['name'];
        $order->save();
        return response()->json($order, 201);
    }

        /**
     * Choose recipe to order
     *
     * @return \Illuminate\Http\Response
     */
    public function prepare_order(Request $request)
    {
        $order = Order::findOrFail($request['id']);
        $order->status = "made";
        $order->save();
        return response()->json($order, 201);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
        $order = Order::create(['status' => 'preparing', 'recipeId' => NULL, 'recipeName' => NULL, 'ingredients' => FALSE]);
        return response()->json($order, 201);
    }


    /**
     * Choose recipe to order
     *
     * @return \Illuminate\Http\Response
     */
    public function choose_recipe(Request $request)
    {
        $order = Order::where('_id', '=', $request['id'])->whereNull('recipeId')->firstOrFail();
        $recipe = Recipe::findOrFail($request['recipeId']);
        $order->recipeId = $recipe['_id'];
        $order->recipeName = $recipe['name'];
        $order->save();
        return response()->json($order, 201);
    }


    /**
     * Get ingredients order
     *
     * @return \Illuminate\Http\Response
     */
    public function ingredients_order(Request $request)
    {
        $order = Order::where('_id', '=', $request['id'])->whereNotNull('recipeId')->where('ingredients', FALSE)->firstOrFail();
        $recipe = Recipe::findOrFail($order->recipeId);
        
        $response = Http::post('http://' . config('store.store_host') . ':' . config('store.store_port') . '/ingredients/request', ['ingredients' => $recipe->ingredients]);
        
        if($response->failed()){
            return response()->json(['message' => 'no hay ingredientes para la preparación'], 400);
        }elseif($response->successful()){
            $order->ingredients = TRUE;
            $order->save();
            return response()->json($order, 201);
        }
    }

    /**
     * Prepare order
     *
     * @return \Illuminate\Http\Response
     */
    public function prepare_order(Request $request)
    {
        $order = Order::where('_id', '=', $request['id'])->where('ingredients', TRUE)->firstOrFail();
        $order->status = "made";
        $order->save();
        return response()->json($order, 201);
    }

}

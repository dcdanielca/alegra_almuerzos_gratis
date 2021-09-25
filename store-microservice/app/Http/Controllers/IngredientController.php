<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
    
class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['ingredients'=>Ingredient::all()], 200);
    }

    /**
     * Purchase ingredient
     *
     * @return \Illuminate\Http\Response
     */
    public function purchase(Request $request)
    {
        $name_ingredient =  $request['ingredient'];
        $response = Http::get('https://recruitment.alegra.com/api/farmers-market/buy?ingredient=' . $name_ingredient);

        $quantity_sold = $response->json()['quantitySold'];
        if($quantity_sold == 0){
            return response()->json(['message'=> "no hay disponibilidad de " . $name_ingredient], 400);
        }

        Ingredient::where('name', '=', $name_ingredient)->increment('quantity', $quantity_sold);

        $created = new \MongoDB\BSON\UTCDateTime(new \DateTime("now"));
        Purchase::insert(['ingredient' => $name_ingredient, 'quantity' => $quantity_sold, 'created' => $created]);
        
        return response()->json(['message'=> "se compraron " . $quantity_sold . " unidades de ". $name_ingredient], 201);

    }


    /**
     * Request ingredient
     *
     * @return \Illuminate\Http\Response
     */
    public function request(Request $request)
    {
        
        $ingredients_request =  $request['ingredients'];
        
        $ingredients_objects = [];
        foreach ($ingredients_request as $ingredient_request) {
            $ingredient = Ingredient::where('name', '=', $ingredient_request['name'])->firstOrFail();
            $quantity_actual = $ingredient->quantity;
            $quantity_required =  $ingredient_request['quantity'];
            if ($quantity_actual - $quantity_required >= 0){
                $ingredient->quantity -= $quantity_required;
                array_push($ingredients_objects, $ingredient); 
            }else{
                return response()->json(['message'=> "no hay ingredientes suficientes para preparación"], 400);
            }

        }

        foreach ($ingredients_objects as $ingredient) {
            $ingredient->save();
        }        

        return response()->json(['message'=> "ingredientes entregados!"], 201);
    }

}

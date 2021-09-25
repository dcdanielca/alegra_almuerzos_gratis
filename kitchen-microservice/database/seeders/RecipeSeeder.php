<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipes = [
            [
                'name' => 'Almuerzo casero',
                'image' => 'https://png.pngtree.com/png-clipart/20210108/ourlarge/pngtree-lunch-clipart-cartoon-lunch-milk-egg-png-image_2678676.jpg',
                'tomato' => 1, 
                'lemon' => 1,
                'potato' => 2, 
                'rice' => 3, 
                'ketchup' => 1, 
                'lettuce'=> 1,
                'onion' => 1, 
                'cheese' => 1, 
                'meat' => 1, 
                'chicken'=> 1
            ],
            [
                'name' => 'Pizza',
                'image' => 'https://cdn5.dibujos.net/dibujos/pintados/202034/pizza-de-pepperoni-comida-pan-y-pasta-11940960.jpg',
                'tomato' => 2, 
                'onion' => 1, 
                'cheese' => 3, 
                'meat' => 1, 
            ],
            [
                'name' => 'Tacos',
                'image' => 'https://image.freepik.com/vector-gratis/dibujo-taco-dibujos-animados_125371-78.jpg',
                'tomato' => 1, 
                'lemon' => 2,
                'ketchup' => 1, 
                'lettuce'=> 1,
                'onion' => 2, 
                'cheese' => 3, 
                'chicken'=> 3
            ],
            [
                'name' => 'Lasagna',
                'image' => 'https://cdn5.dibujos.net/dibujos/pintados/201749/lasana-comida-pan-y-pasta-11214326.jpg',
                'tomato' => 2, 
                'ketchup' => 1, 
                'lettuce'=> 2,
                'onion' => 2, 
                'cheese' => 4, 
                'meat' => 2, 
                'chicken'=> 2
            ],
            [
                'name' => 'Pollo asado',
                'image' => 'https://st2.depositphotos.com/1713003/8284/v/450/depositphotos_82846076-stock-illustration-fried-chicken.jpgg',
                'tomato' => 1, 
                'potato' => 2, 
                'rice' => 3, 
                'ketchup' => 1, 
                'lettuce'=> 1,
                'onion' => 1, 
                'chicken'=> 4
            ],
            [
                'name' => 'Ramen',
                'image' => 'https://cdn5.dibujos.net/dibujos/pintados/201822/bol-de-ramen-comida-pan-y-pasta-11379114.jpg',
                'tomato' => 4, 
                'potato' => 1, 
                'rice' => 2, 
                'ketchup' => 2, 
                'lettuce'=> 2,
                'onion' => 1, 
                'meat' => 1, 
                'chicken'=> 1
            ]
        ];

        Recipe::insert($recipes);
    }
}

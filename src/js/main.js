/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */


//all recipes - buttton>> all receipes it its place - handle header

// importing
import  {FoodLog} from './FoodLog.js';
import  {ProductScanner} from './productsScanner.js';
let scanner = new ProductScanner();

let tabs = document.querySelectorAll(".nav-link");

tabs.forEach((ele) => {
    ele.addEventListener("click", () => {
        let tabName = ele.dataset.tab;

        
        location.hash = tabName;
    });
});

let foodlog = new FoodLog();

foodlog.displayDate();

// modal


// display meals

let content  = document.querySelector("#content");
let searchInput = document.querySelector("#search-input");



let categoriesGrid = document.querySelector("#categories-grid");

let allRecipesBtn = document.querySelector("#all-recipes");
// console.log(allRecipesBtn);
let recipesGrid = document.querySelector("#recipes-grid");
let allRegions = document.querySelector("#all-regions");

let recipesCount = document.querySelector("#recipes-count");
let mealDetails = document.querySelector("#meal-details");


let foodlogSection =document.querySelector("#foodlog-section");


let categories=[];


class Category{


    constructor(){}        
      
    getAPIAllRegions(){
 
        return `https://nutriplan-api.vercel.app/api/meals/areas`;
      }


      getAPIAllCategories(){
 
        return `https://nutriplan-api.vercel.app/api/meals/categories`;

      }

      async allRegions(){
    
        let res = await fetch(this.getAPIAllRegions());
        let data = await res.json();

        return data.results;
   }

     

      
    async allCategories(){
       
     let res = await fetch(this.getAPIAllCategories());
     let data = await res.json();
    //  console.log(data);
     return data.results ;

    }

   
  
     categoriesDetail(){
        let categoryStyle= {};
        categories.forEach(ele =>{
          
            if(ele.name==="Beef"){
                categoryStyle[ele.name]={
                   icon:" fa-drumstick-bite",
                   iconBgF: "red-400",
                   iconBgT: "rose-500",

                }
            }

           else if(ele.name==="Chicken"){
                categoryStyle[ele.name]={
                   icon:"fa-drumstick-bite",
                   iconBgF: "orange-400",
                   iconBgT: "amber-500",
                }
            }

            else if(ele.name==="Dessert"){
                categoryStyle[ele.name]={
                   icon:"fa-cake-candles",
                   iconBgF: "pink-400",
                   iconBgT: "rose-500",
                }
            }

            else if(ele.name==="Lamb"){
                categoryStyle[ele.name]={
                   icon:"fa-drumstick-bite",
                   iconBgF: "orange-400",
                   iconBgT: "amber-500",
                }
            }

            
            else if(ele.name==="Miscellaneous"){
                categoryStyle[ele.name]={
                   icon:"fa-bowl-rice",
                   iconBgF: "slate-400",
                   iconBgT: "gray-500",
                }
            }

            else if(ele.name==="Pasta"){
                categoryStyle[ele.name]={
                   icon:"fa-bowl-rice",
                   iconBgF: "yellow-400",
                   iconBgT: "amber-500",
                    
                }
            }

            
            else if(ele.name==="Pork"){
                categoryStyle[ele.name]={
                   icon:"fa-bacon",
                   iconBgF: "rose-500",
                   iconBgT: "red-500",
                }
            }


            else if(ele.name==="Seafood"){
                categoryStyle[ele.name]={
                   icon:"fa-fish",
                   iconBgF: "cyan-400",
                   iconBgT: "blue-500",
                    
                }
            }

            else if(ele.name==="Side"){
                categoryStyle[ele.name]={
                   icon:"fa-plate-wheat",
                   iconBgF: "green-400",
                   iconBgT: "emerald-500",
                }
            }

            else if(ele.name==="Starter"){
                categoryStyle[ele.name]={
                   icon:"fa-utensils",
                   iconBgF: "teal-400",
                   iconBgT: "cyan-500",
                }
            }

            else if(ele.name==="Vegan"){
                categoryStyle[ele.name]={
                   icon:"fa-leaf",
                   iconBgF: "emerald-400",
                   iconBgT: "green-500",
                }
            }

            else if(ele.name==="Vegetarian"){
                categoryStyle[ele.name]={
                   icon:"fa-leaf",
                   iconBgF: "lime-400",
                   iconBgT: "green-500",
                }
            }

            else if(ele.name==="Breakfast"){
                categoryStyle[ele.name]={
                   icon:"fa-plate-wheat",
                   iconBgF: "slate-400",
                   iconBgT: "gray-500",
                }
            }


            else if(ele.name==="Goat"){
                categoryStyle[ele.name]={
                   icon:"fa-cake-candles",
                   iconBgF: "cyan-400",
                   iconBgT: "blue-500",
                }
            }


            




            
        
        });

        return categoryStyle;
    }
     
   
     
    displayAllRegions(){

        let temp="";
       
       

        regions.forEach((ele)=>{
            
            temp+=  `  <button
            class=" special-region-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
          >
            ${ele.name}
          </button>`;

          
        });

  
        allRegions.innerHTML+= temp;
       

        console.log(allRegions)
    }

    displayAllCategories(){
        let temp="";
         categories.forEach(ele => {
            temp+=   `<div
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${ele.name}"
          >
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br from-${style[ele.name]["iconBgF"]} to-${style[ele.name]["iconBgT"]}  rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
              >
              <i class="fa-solid ${style[ele.name]["icon"]}"></i>
              </div>
              <div>
                <button class="category-special-btn text-sm font-bold text-gray-900">${ele.name}</button>
              </div>
            </div>
          </div>`;
         });

         categoriesGrid.innerHTML = temp;

         
    }

   


    

}

class Meal {
//  specialRegionBtns 
    constructor(){}
   
 
    getAPIRandomMeals(){
       
       
        return `https://nutriplan-api.vercel.app/api/meals/random?count=25`;
    }

    async randomMeals(){
    
        let res = await fetch(this.getAPIRandomMeals());
        let data = await res.json();

        return data.results;
   }

   displayRandomMeals(){

    let temp="";
    let count=0;

    meals.forEach((ele)=>{
       temp+=    ` <div
       class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
       data-meal-id="${ele.id}"
     >
       <div class="relative h-48 overflow-hidden">
         <img
           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
           src="${ele.thumbnail}"
           alt="${ele.name}"
           loading="lazy"
         />
         <div class="absolute bottom-3 left-3 flex gap-2">
           <span
             class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
           >
             ${ele.category}
           </span>
           <span
             class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
           >
             ${ele.area}
           </span>
         </div>
       </div>
       <div class="p-4">
         <h3
           class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
         >
           ${ele.name}
         </h3>
         <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            ${ele.instructions}
         </p>
         <div class="flex items-center justify-between text-xs">
           <span class="font-semibold text-gray-900">
             <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
             ${ele.category}
           </span>
           <span class="font-semibold text-gray-500">
             <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
             ${ele.area}
           </span>
         </div>
       </div>
     </div> `

     count++;
    });
    recipesGrid.innerHTML=temp;

   
    recipesCount.innerHTML=`Showing ${count}recipes`
    
   }
// 
  getAPIRegionMeals(btn){
     
     return `https://nutriplan-api.vercel.app/api/meals/filter?area=${btn}&page=1&limit=25`;
  }



  async getRegionMeals(btn){
      
       
       let res = await fetch(this.getAPIRegionMeals(btn));
       let data =await res.json();
       return data.results;

  }



    displayMailsRegion(regionMeals){
        let temp="";
        let count=0;
        let country="";
        regionMeals.forEach((ele)=>{
          temp+=   ` <div
          class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          data-meal-id="${ele.id}"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src="${ele.thumbnail}"
              alt="${ele.name}"
              loading="lazy"
            />
            <div class="absolute bottom-3 left-3 flex gap-2">
              <span
                class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
              >
               ${ele.category}
              </span>
              <span
                class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
              >
                ${ele.area}
              </span>
            </div>
          </div>
          <div class="p-4">
            <h3
              class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
            >
              ${ele.name}
            </h3>
            <p class="text-xs text-gray-600 mb-3 line-clamp-2">
              ${ele.instructions}
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="font-semibold text-gray-900">
                <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                ${ele.category}
              </span>
              <span class="font-semibold text-gray-500">
                <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                ${ele.area}
              </span>
            </div>
          </div>
        </div> `
        count++; 
        country=ele.area;
        });

       
        recipesCount.innerHTML=`Showing ${count} ${country} recipes`

        if(count===0){

          recipesGrid.innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
          </div>
          <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
      </div>`
        }

        else {
           recipesGrid.innerHTML=temp;  
        }
    }

    getAPICategoryMeals(btn){

      return `https://nutriplan-api.vercel.app/api/meals/filter?category=${btn}&page=1&limit=25`;
    }
    
  async  getCategoryMeals(btn){

      let res = await fetch(this.getAPICategoryMeals(btn)); 
      let data = await res.json();
      return data.results;
    }

    displayMailsCategory(categoryMeals){
      let temp="";
      let count=0;
      let categ=""
      categoryMeals.forEach((ele)=>{
        temp+=   ` <div
        class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-meal-id="${ele.id}"
      >
        <div class="relative h-48 overflow-hidden">
          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${ele.thumbnail}"
            alt="${ele.name}"
            loading="lazy"
          />
          <div class="absolute bottom-3 left-3 flex gap-2">
            <span
              class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
            >
             ${ele.category}
            </span>
            <span
              class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
            >
              ${ele.area}
            </span>
          </div>
        </div>
        <div class="p-4">
          <h3
            class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
          >
            ${ele.name}
          </h3>
          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            ${ele.instructions}
          </p>
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-gray-900">
              <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
              ${ele.category}
            </span>
            <span class="font-semibold text-gray-500">
              <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
              ${ele.area}
            </span>
          </div>
        </div>
      </div> `
      count++; 
      categ=ele.category;
      });

     
      recipesCount.innerHTML=`Showing ${count} ${categ} recipes`

      if(count===0){

        recipesGrid.innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
        </div>
        <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
    </div>`
      }

      else {
         recipesGrid.innerHTML=temp;  
      }
  }


  getAPIsearchForMeal(q){


      return `https://nutriplan-api.vercel.app/api/meals/search?q=${q}&page=1&limit=25`;
  
  } 


 async getSearchResults(n){
    
     let res = await fetch(this.getAPIsearchForMeal(n));
     let data = await res.json();
     return data.results;

  }


  displaysearchResults(meals){
    let temp="";
    let count=0;

    meals.forEach((ele)=>{
      temp+=   ` <div
      class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      data-meal-id="${ele.id}"
    >
      <div class="relative h-48 overflow-hidden">
        <img
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src="${ele.thumbnail}"
          alt="${ele.name}"
          loading="lazy"
        />
        <div class="absolute bottom-3 left-3 flex gap-2">
          <span
            class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
          >
           ${ele.category}
          </span>
          <span
            class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
          >
            ${ele.area}
          </span>
        </div>
      </div>
      <div class="p-4">
        <h3
          class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
        >
          ${ele.name}
        </h3>
        <p class="text-xs text-gray-600 mb-3 line-clamp-2">
          ${ele.instructions}
        </p>
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-gray-900">
            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
            ${ele.category}
          </span>
          <span class="font-semibold text-gray-500">
            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
            ${ele.area}
          </span>
        </div>
      </div>
    </div> `
    count++; 
 
    });

   
    recipesCount.innerHTML=`Showing ${count}recipes`

    if(count===0){

      recipesGrid.innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
      </div>
      <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
  </div>`
    }

    else {
       recipesGrid.innerHTML=temp;  
    }
}

getAPIMealById(id){
  return `https://nutriplan-api.vercel.app/api/meals/${id}`;
}


async getMealById(id){

  let res = await fetch(this.getAPIMealById(id));
  let data = await res.json();
  return data.result;
}

/*
<div
class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
>
<div
  class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
>
  5
</div>
<p class="text-gray-700 leading-relaxed pt-2">
  *Meanwhile, steam the vegetables according to package
  directions and stir together with the cooked brown rice.
  Add the remaining sauce to the mixture and stir to
  combine. Serve the chicken over the rice and veggie
  mixture.
</p>
</div>*/
displayMealDetail(meal, mealDetail){
       let temp;
       let ingreds = mealDetail.ingredients;
       console.log(ingreds);
       let tempIngred="";

       let instructs = meal.instructions;
       console.log(instructs);
       let tempInstruct="";

   ingreds.forEach((ele,i)=>{
     
     tempIngred+=` <div
     class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
   >
     <input
       type="checkbox"
       class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
     />
     <span class="text-gray-700">
         ${ele.original}
     </span>
   </div>`;

});

instructs.forEach((ele,i)=>{
     
  tempInstruct+=` <div
  class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
>
  <input
    type="checkbox"
    class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
  />
  <span class="text-gray-700">
      ${ele}
  </span>
</div>`;

});
let videoId = meal.youtube.split("v=")[1];

       
       temp= `<div  class="max-w-7xl mx-auto">
  <!-- Back Button -->
  <button
    id="back-to-meals-btn"
    class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
  >
    <i class="fa-solid fa-arrow-left"></i>
    <span>Back to Recipes</span>
  </button>

  <!-- Hero Section -->
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
    <div class="relative h-80 md:h-96">
      <img
        // src="${meal.thumbnail}"
        alt="${meal.name}"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="flex items-center gap-3 mb-3">
          <span
            class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
            >${meal.category}</span
          >
          <span
            class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
            >${meal.area}</span
          >
          <span
            class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
            >Casserole</span
          >
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          ${meal.name}
        </h1>
        <div class="flex items-center gap-6 text-white/90">
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-clock"></i>
            <span>30 min</span>
          </span>
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-utensils"></i>
            <span id="hero-servings">${mealDetail.servings} servings</span>
          </span>
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-fire"></i>
            <span id="hero-calories">${mealDetail.perServing.calories} cal/serving</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div id="log-meal" class="flex flex-wrap gap-3 mb-8">
    <button
      id="log-meal-btn"
      class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
      data-meal-id="52772"
    >
      <i class="fa-solid fa-clipboard-list"></i>
      <span>Log This Meal</span>
    </button>
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left Column - Ingredients & Instructions -->
    <div class="lg:col-span-2 space-y-8">
      <!-- Ingredients -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-list-check text-emerald-600"></i>
          Ingredients
          <span class="text-sm font-normal text-gray-500 ml-auto"
            >${mealDetail.ingredients.length}</span
          >
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${tempIngred}        
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
          Instructions
        </h2>
        <div class="space-y-4">
           ${tempInstruct}
         
        </div>
      </div>

      <!-- Video Section -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-video text-red-500"></i>
          Video Tutorial
        </h2>
        <div
          class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
        >
          <iframe
         
           }
           
            src="https://www.youtube.com/embed/${videoId}"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </div>

    <!-- Right Column - Nutrition -->
    <div class="space-y-6">
      <!-- Nutrition Facts -->
      <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-chart-pie text-emerald-600"></i>
          Nutrition Facts
        </h2>
        <div id="nutrition-facts-container">
          <p class="text-sm text-gray-500 mb-4">Per serving</p>

          <div
            class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
          >
            <p class="text-sm text-gray-600">Calories per serving</p>
            <p class="text-4xl font-bold text-emerald-600">${mealDetail.perServing.calories}</p>
            <p class="text-xs text-gray-500 mt-1">Total: ${mealDetail.totals.calories} cal</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span class="text-gray-700">Protein</span>
              </div>
           
              <span class="font-bold text-gray-900">${mealDetail.totals.protein}g</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-emerald-500 h-2 rounded-full"
                style="width: 84%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                <span class="text-gray-700">Carbs</span>
              </div>
              <span class="font-bold text-gray-900">${mealDetail.totals.carbs}g</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                style="width: 17%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                <span class="text-gray-700">Fat</span>
              </div>
              <span class="font-bold text-gray-900">${mealDetail.totals.fat}g</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-purple-500 h-2 rounded-full"
                style="width: 12%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                <span class="text-gray-700">Fiber</span>
              </div>
              <span class="font-bold text-gray-900">${mealDetail.totals.fiber}g</span>
            </div>
           
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-orange-500 h-2 rounded-full"
                style="width: 14%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                <span class="text-gray-700">Sugar</span>
              </div>
              <span class="font-bold text-gray-900">${mealDetail.totals.sugar}g</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-pink-500 h-2 rounded-full"
                style="width: 24%"
              ></div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-100">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">
              Vitamins & Minerals (% Daily Value)
            </h3>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Vitamin A</span>
                <span class="font-medium">15%</span>
              </div>
              




              <div class="flex justify-between">
                <span class="text-gray-600">Cholesterol</span>
                <span class="font-medium">${mealDetail.totals.cholesterol}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sodium</span>
                <span class="font-medium">${mealDetail.totals.sodium}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Iron</span>
                <span class="font-medium">12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>`;

        mealDetails.innerHTML=temp;
}
   

  
}


 




let category= new Category();
let meal = new Meal();


let regions = await category.allRegions();
categories= await category.allCategories();
// console.log(categories);

category.displayAllRegions();

let style=  category.categoriesDetail();
category.displayAllCategories();

let meals  = await meal.randomMeals();
// console.log(meals);
meal.displayRandomMeals();




      
  allRegions.addEventListener("click", (e) => {
    if (e.target.id === "all-recipes") {
        meal.displayRandomMeals();
    }
});


    
let specialRegionBtns = document.querySelectorAll(".special-region-btn");
// console.log(specialRegionBtns);
let btnRegionContent;
// console.log(specialRegionBtns);

specialRegionBtns.forEach((ele)=>{

  ele.addEventListener("click",async(e)=>{

    btnRegionContent= e.target.textContent.trim();
    // console.log(btnRegionContent);
    
console.log( meal.getAPIRegionMeals(btnRegionContent) ) ;


let regionMeals =await meal.getRegionMeals(btnRegionContent);
meal.displayMailsRegion(regionMeals);
  });
})
let btnCategoryContent;
let categorySpecialBtns=document.querySelectorAll(".category-card");
// console.log(categorySpecialBtns);
categorySpecialBtns.forEach((ele)=>{

     ele.addEventListener("click",async (e)=>{
      // console.log("clicked");
      btnCategoryContent = e.target.textContent.trim();

      let categoryMeals = await meal.getCategoryMeals(btnCategoryContent);
       meal.displayMailsCategory(categoryMeals);
      
     });

});

let searchWord;
let searchResults;
// console.log(searchInput);
searchInput.addEventListener("input",async ()=>{
  console.log(searchInput);

searchWord = searchInput.value;
if(searchWord===""){
  meal.displayRandomMeals();
}
else{
  searchResults= await  meal.getSearchResults(searchWord);

  meal.displaysearchResults(searchResults);
}

});

//selecting all cards
let allMeals = document.querySelectorAll(".recipe-card");
let specialMeal;

let mealObj={};
let m;
let ingredientsM;
let detailMeal ;
allMeals.forEach((ele)=>{

  ele.addEventListener("click",async ()=>{

    //console.log(ele.dataset.mealId);
    specialMeal = ele.dataset.mealId;
     m =  await meal.getMealById(specialMeal);
    console.log(m);

    console.log(m.name);
    console.log(m.ingredients);
     ingredientsM = m.ingredients.map((ele) => {
      return `${ele.measure} ${ele.ingredient}`;
    });
    mealObj={
      "recipeName":m.name,
      "ingredients":ingredientsM,
    }
    
    let res = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",
        headers: {
          "x-api-key": "CkFwkzFWk6B66PKjbQ9JTcKJtPQzB98GmJdgqWkg",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mealObj),
      }
    );
   
  
    let data = await res.json();
    if (!res.ok) {
      return;
    }  
              
    // console.log(data.data);
     detailMeal = data.data;
    // console.log(detailMeal);
    // console.log("Meal:", m);
// console.log("Nutrition:", detailMeal);
// console.log("Meal name:", m?.name);
// console.log("Nutrition details:", detailMeal?.perServing);

// console.log("Per Serving:", detailMeal.perServing);
// console.log("Calories:", detailMeal.perServing.calories);
// console.log("Protein:", detailMeal.perServing.protein);
    // mealDetails.classList.add("d-none", "d-flex");
    content.classList.add("d-none");
   meal.displayMealDetail(m,detailMeal);
     
    foodlog.openModal(mealDetails);
    foodlog.modelData(m, detailMeal);
   

  });

});
foodlog.servingCalculation();

foodlog.logFood();
foodlog.closeModal();


foodlog.displayLoggedMeals();
foodlog.clearAll();

foodlog.calculateDailyN();

          
scanner.searchProducts();
scanner.searchByBarcode();


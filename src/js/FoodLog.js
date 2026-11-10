



let foodlogDate = document.querySelector("#foodlog-date");

let exampleModal = document.querySelector("#exampleModal");

let modalImg = document.querySelector("#modal-img");

let modalTitle= document.querySelector("#modal-title");
let caloriesPerServing = document.querySelector("#calories-per-serving");
let protienPerServing  =document.querySelector("#protien-per-serving");
let carbsPerServing  = document.querySelector("#carbs-per-serving")
let fatPerServing =document.querySelector("#fat-per-serving");
let increaseServing = document.querySelector("#increase-serving");
let decreaseServing = document.querySelector("#decrease-serving");


let log= document.querySelector("#log");
let cancel = document.querySelector("#cancel");

let  loggedItemsContainer = document.querySelector("#logged-items");
let clearFoodlog=document.querySelector("#clear-foodlog");
let loggedItemsList = document.querySelector("#logged-items-list");
let deleteLoggedItem;


let caloriesRate = document.querySelector("#calories-rate");
let caloriesProgress = document.querySelector("#calories-progress");

let proteinRate = document.querySelector("#protien-rate");
let proteinProgress = document.querySelector("#protien-progress");

let carbsRate = document.querySelector("#carbs-rate");
let carbsProgress = document.querySelector("#carbs-progress");

let fatRate = document.querySelector("#fat-rate");
let fatProgress = document.querySelector("#fat-progress");




let logItems=[];
if(localStorage.getItem("loggeditems")!=null){
 logItems= JSON.parse(localStorage.getItem("loggeditems"));
//  console.log(logItems);
}

let numberServingValue =document.querySelector("#number-serving-value");
export class FoodLog{
  
    constructor(){

        

    }

        getDate(){

     
            let today = new Date();
        
            let options = {
                weekday: "long",
                month: "short",
                day: "numeric"
            };
        
            return today.toLocaleDateString("en-US", options);
        }

        displayDate(){

            foodlogDate.innerHTML = this.getDate();
        }

        openModal(mealDetails) {
         

    mealDetails.addEventListener("click", (e) => {
              
        if (e.target.id=== "log-meal-btn" ||
            e.target.parentElement?.id === "log-meal-btn") {
            console.log("click");
            let modal = bootstrap.Modal.getOrCreateInstance(exampleModal);
            modal.show();
        }

    });
        }
 
        modelData(m,mealdetail){

            this.selectedMeal = m;
            this.selectedMealDetails = mealdetail;

            console.log("Selected Meal:", this.selectedMeal);
console.log("Meal Details:", this.selectedMealDetails);

            modalImg.innerHTML =   `<img class="rounded-3" src=${m.thumbnail}>` ;
            modalTitle.innerHTML = m.name;
            caloriesPerServing.innerHTML = mealdetail.perServing.calories;
            protienPerServing.innerHTML = mealdetail.perServing.protein;
            fatPerServing.innerHTML = mealdetail.perServing.fat;
            carbsPerServing.innerHTML = mealdetail.perServing.carbs;


        }

        servingCalculation(){
       
            increaseServing.addEventListener("click", ()=>{
            
                
                numberServingValue.value =  Number(numberServingValue.value) + 0.5;
            });

            decreaseServing.addEventListener("click", ()=>{
            
                if(Number(numberServingValue.value )>0.5){
                    numberServingValue.value =  Number(numberServingValue.value) - 0.5;
        
                }
                 });
        }

        logFood(){
       
            
            log.addEventListener("click",()=>{
              
                let m = this.selectedMeal;
                let mealDetail = this.selectedMealDetails;
                let servings = Number(numberServingValue.value);

                let today = new Date();

                let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        
                let time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
        
                // console.log("Servings:", numberServingValue.value);
                // console.log("Meal details:", mealDetail.perServing);
                let item={
                    name: m.name,
                    src:m.thumbnail,
                    servings:  servings,
                    calories: mealDetail.perServing.calories * servings,
                    protein:    mealDetail.perServing.protein *servings,
                    fat:  mealDetail.perServing.fat * servings,
                   carbs : mealDetail.perServing.carbs * servings, 
                   date: date,
                   time: time,

                }
                console.log("New item:", item);
                logItems.push(item);
                localStorage.setItem("loggeditems", JSON.stringify(logItems));
                this.closeModal();
    
                
                this.displayLoggedMeals();
                this.calculateDailyN();
                // 
            });
          
         
           
            


        }

        displayLoggedMeals(){
           
          let temp="";
           
        logItems.forEach((ele,i)=>{
            // console.log(ele);
            // console.log(ele.time);
             temp +=`<div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
            <div class="flex items-center gap-4">
                <img src="${ele.src}" alt="Chicken Handi" class="w-14 h-14 rounded-xl object-cover">
                <div>
                    <p class="font-semibold text-gray-900">${ele.name}</p>
                    <p class="text-sm text-gray-500">
                    ${ele.servings} serving
                        <span class="mx-1">•</span>
                        <span class="text-emerald-600">Recipe</span>
                    </p>
                    <p class="text-xs text-gray-400 mt-1">${ele.time}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p class="text-lg font-bold text-emerald-600">${ele.calories}</p>
                    <p class="text-xs text-gray-500">kcal</p>
                </div>
                <div class="hidden md:flex gap-2 text-xs text-gray-500">
                    <span class="px-2 py-1 bg-blue-50 rounded">${ele.protein}g P</span>
                    <span class="px-2 py-1 bg-amber-50 rounded">${ele.carbs}g C</span>
                    <span class="px-2 py-1 bg-purple-50 rounded">${ele.fat}g F</span>
                </div>
                <button  class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${i}">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                </button>
            </div>
        </div>` ; 
        });

        loggedItemsList.innerHTML = temp;
        loggedItemsList.querySelectorAll(".remove-foodlog-item").forEach((btn) => {
            btn.addEventListener("click", () => {
              let index = Number(btn.dataset.index);
          
              this.deleteLoggedMeal(index);
            });
          });
        // console.log(loggedItemsList.innerHTML);
        loggedItemsContainer.innerHTML = logItems.length;
        }
          
        clearModal(){
           
            numberServingValue.value = 1;

        }

        closeModal(){
            
          
                let modal = bootstrap.Modal.getOrCreateInstance(exampleModal);
                modal.hide();
                this.clearModal();
            
           
        }

        cancelModal(){
            cancel.addEventListener("click",()=>{
                this.closeModal();
            })
        }


        clearAll(){

            clearFoodlog.addEventListener("click",()=>{
           
                localStorage.removeItem("loggeditems");
                logItems = [];

                this.displayLoggedMeals();
                this.calculateDailyN();
               
            });
        }

         deleteLoggedItem = document.querySelector("#delete-logged-item");

        deleteLoggedMeal(i){
            logItems.splice(i, 1);

            localStorage.setItem("loggeditems", JSON.stringify(logItems));

             loggedItemsContainer.innerHTML = logItems.length;

             this.displayLoggedMeals();
            this.calculateDailyN();
        }


        calculateDailyN() {
            let today = new Date();
          
            let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
          
            let totalCalories = 0;
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;
          
            logItems.forEach((ele) => {
              if (ele.date === date) {
                totalCalories += Number(ele.calories);
                totalProtein += Number(ele.protein);
                totalCarbs += Number(ele.carbs);
                totalFat += Number(ele.fat);
              }
            });

            caloriesRate.innerHTML = `${totalCalories} / 2000 kcal`;
            proteinRate.innerHTML = `${totalProtein} / 50 g`;
             carbsRate.innerHTML = `${totalCarbs} / 250 g`;
            fatRate.innerHTML = `${totalFat} / 65 g`;
          

            let caloriesPercentage = (totalCalories / 2000) * 100;
            let proteinPercentage = (totalProtein / 50) * 100;
            let carbsPercentage = (totalCarbs / 250) * 100;
             let fatPercentage = (totalFat / 65) * 100;


             caloriesProgress.style.width = `${Math.min(caloriesPercentage, 100)}%`;
            proteinProgress.style.width = `${Math.min(proteinPercentage, 100)}%`;
           carbsProgress.style.width = `${Math.min(carbsPercentage, 100)}%`;
           fatProgress.style.width = `${Math.min(fatPercentage, 100)}%`;
          }
    
    }







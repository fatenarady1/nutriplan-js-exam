let productSearchInput = document.querySelector("#product-search-input");
let searchProductBtn = document.querySelector("#search-product-btn");
let barcodeInput = document.querySelector("#barcode-input");
let lookupBarcodeBtn = document.querySelector("#lookup-barcode-btn");
let productsGrid = document.querySelector("#products-grid");
let productsCount = document.querySelector("#products-count");

let searchValue;
let searchedProducts ;
let searchedBarcodes;

export class ProductScanner {

    

    async searchProducts() {
      searchProductBtn.addEventListener("click", async () => {
  
         searchValue = productSearchInput.value.trim();
  
        if (searchValue === "") {
          return;
        }
  
        let res = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${searchValue}&page=1&limit=24` );
  
        let data = await res.json();
  
        console.log(data.results);
         searchedProducts = data.results;
        this.displaySearchProducts();
       
      });
    }
  
    displaySearchProducts(){
       let temp = "";

       searchedProducts.forEach((ele) => {
        console.log(ele.nutrients);
        console.log(Object.keys(ele.nutrients || {}));
          temp+= `<div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${ele.barcode}">
          <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          src="${ele.image || ""}"
          alt="${ele.name || "Product"}"
          loading="lazy"
          onerror="this.onerror=null; this.style.display='none'"
        >
              
              <!-- Nutri-Score Badge -->
              
                  <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                      Nutri-Score ${ele.nutritionGrade}
                  </div>
              
              
              <!-- NOVA Badge -->
              
                  <div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${ele.novaGroup}">
                  ${ele.novaGroup}
                  </div>
              
          </div>
          
          <div class="p-4">
              <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${ele.brand}</p>
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${ele.name}
              </h3>
              
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-weight-scale" data-prefix="fas" data-icon="weight-scale" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M116.6 192c-3-10.1-4.6-20.9-4.6-32 0-61.9 50.1-112 112-112S336 98.1 336 160c0 11.1-1.6 21.9-4.6 32l-71 0 24.6-44.3c6.4-11.6 2.3-26.2-9.3-32.6s-26.2-2.3-32.6 9.3l-37.6 67.7-88.8 0zM128 32L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-64 0C293.3 11.9 260 0 224 0s-69.3 11.9-96 32z"></path></svg></i>${ele.quantity}</span>
                  
              </div>
              
              <!-- Mini Nutrition -->
              <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${ele.nutrients?.protein??0}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">  ${ele.nutrients?.carbs??0}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">   ${ele.nutrients?.fat?? 0}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">   ${ele.nutrients?.sugar??0}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
              </div>
          </div>
      </div>`
       }); 

       productsGrid.innerHTML = temp;

    }
    async searchByBarcode() {
      lookupBarcodeBtn.addEventListener("click", async () => {
  
        let barcode = barcodeInput.value.trim();
  
        if (barcode === "") {
          return;
        }
  
        let res = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
  
        let data = await res.json();
        searchedBarcodes = data.results;
        console.log(data);
  
      });
    }

    displaySearchBarcodes(){
        let temp = "";
 
        searchedBarcodes.forEach((ele) => {
         console.log(ele.nutrients);
         console.log(Object.keys(ele.nutrients || {}));
           temp+= `<div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${ele.barcode}">
           <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
           <img
           class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
           src="${ele.image || ""}"
           alt="${ele.name || "Product"}"
           loading="lazy"
           onerror="this.onerror=null; this.style.display='none'"
         >
               
               <!-- Nutri-Score Badge -->
               
                   <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                       Nutri-Score ${ele.nutritionGrade}
                   </div>
               
               
               <!-- NOVA Badge -->
               
                   <div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${ele.novaGroup}">
                   ${ele.novaGroup}
                   </div>
               
           </div>
           
           <div class="p-4">
               <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${ele.brand}</p>
               <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                   ${ele.name}
               </h3>
               
               <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                   <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-weight-scale" data-prefix="fas" data-icon="weight-scale" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M116.6 192c-3-10.1-4.6-20.9-4.6-32 0-61.9 50.1-112 112-112S336 98.1 336 160c0 11.1-1.6 21.9-4.6 32l-71 0 24.6-44.3c6.4-11.6 2.3-26.2-9.3-32.6s-26.2-2.3-32.6 9.3l-37.6 67.7-88.8 0zM128 32L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-64 0C293.3 11.9 260 0 224 0s-69.3 11.9-96 32z"></path></svg></i>${ele.quantity}</span>
                   
               </div>
               
               <!-- Mini Nutrition -->
               <div class="grid grid-cols-4 gap-1 text-center">
                   <div class="bg-emerald-50 rounded p-1.5">
                       <p class="text-xs font-bold text-emerald-700">${ele.nutrients?.protein??0}</p>
                       <p class="text-[10px] text-gray-500">Protein</p>
                   </div>
                   <div class="bg-blue-50 rounded p-1.5">
                       <p class="text-xs font-bold text-blue-700">  ${ele.nutrients?.carbs??0}</p>
                       <p class="text-[10px] text-gray-500">Carbs</p>
                   </div>
                   <div class="bg-purple-50 rounded p-1.5">
                       <p class="text-xs font-bold text-purple-700">   ${ele.nutrients?.fat?? 0}</p>
                       <p class="text-[10px] text-gray-500">Fat</p>
                   </div>
                   <div class="bg-orange-50 rounded p-1.5">
                       <p class="text-xs font-bold text-orange-700">   ${ele.nutrients?.sugar??0}</p>
                       <p class="text-[10px] text-gray-500">Sugar</p>
                   </div>
               </div>
           </div>
       </div>`
        }); 
 
        productsGrid.innerHTML = temp;
 
     }


  
  }

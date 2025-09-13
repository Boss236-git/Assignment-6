
// spinner section////

const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};

const hideSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};


const loadFetch =()=>{

    fetch("https://openapi.programming-hero.com/api/categories")
    .then((take)=> take.json())
    .then((took)=> displayCategory(took.categories))

}


const loadPlants = ()=>{
    showSpinner()

     const urls = `https://openapi.programming-hero.com/api/plants`
     fetch(urls)
    .then((plants)=> plants.json())
    .then((allPlants)=> {displayFruit(allPlants.plants);
     hideSpinner();
})
    .catch(() => hideSpinner());
}

const removeActive = () =>{
    const removeHighlight= document.querySelectorAll(".removeA")
    
    removeHighlight.forEach((highlight) => highlight.classList.remove("active"));
    
};


// Modal section////

const loadDetails = async (idd) => {
const urlD= `https://openapi.programming-hero.com/api/plant/${idd}`
const res = await fetch(urlD)
const details= await res.json();
displayDetails(details.plants);


}


const displayDetails=(pDetail)=>{

    
    

    const newDetails = document.getElementById("modalContainer")

  
   

    newDetails.innerHTML=`

      <div>
   <h2 class="text-2xl font-bold">${pDetail.name} </h2>

   <img class="w-95 h-70 mt-5 rounded-md " src="${pDetail.image}" alt="">

   <h3 class=" mt-4 font-bold"> Category : <span class="font-normal"> ${pDetail.category} </span>
   </h3>

   <p class="font-bold mt-2">Price : <span class="font-normal"> ${pDetail.price} </span></p>

   <p class="font-bold mt-2">description : <span class="font-normal"> ${pDetail.description} </span></p>
   </div>
    
    `

    document.getElementById("myModal").showModal();  
}


const loadData=(id)=>{
showSpinner();

const url = `https://openapi.programming-hero.com/api/category/${id}`;
  
  fetch(url)
  
  .then((newAdd)=> newAdd.json())
  .then((completeOne)=> {

    // remove active button

    removeActive();


// activate button
    const activeCategory= document.getElementById(`activeCategory-${id}`);
    
    activeCategory.classList.add("active");

    displayFruit(completeOne.plants);
    hideSpinner();

  }
  )

.catch(() => hideSpinner());
}

// ////////////  cart///////////


let cart = [];
let total = 0;

const updateCartUI = () => {
  const cartBody = document.getElementById("cart-body");
  const cartContainer = document.getElementById("cart");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartBody.classList.add("hidden");
    cartTotal.innerText = 0;
    return;
  }

  cartBody.classList.remove("hidden");

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center p-3 border-b";

    div.innerHTML = `
      <div>
        <h2 class="font-semibold">${item.name}</h2>
        <p>৳ ${item.price}</p>
      </div>
      <div class="cursor-pointer text-red-500">
        <i class="fa-solid fa-xmark"></i>
      </div>
    `;

    // Remove item when clicking X
    div.querySelector("i").addEventListener("click", () => {
      total -= item.price;
      cart.splice(index, 1);
      updateCartUI();
    });

    cartContainer.appendChild(div);
  });

  cartTotal.innerText = total;
};

// Clear cart button
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  total = 0;
  updateCartUI();
});






const displayFruit=(fruit)=>{
   
const cardContainer = document.getElementById("card-container")
cardContainer.innerHTML = "";


const limitedFruits = fruit.slice(0, 6);

limitedFruits.forEach((allFruit) => {

  
    


const createNew = document.createElement("div")
createNew.innerHTML=`

  <div class="bg-white  w-70 h-90  p-4 rounded-xl flex flex-col  ">


    <div class="">
    <div class=" w-61 h-40 rounded-md "> 
       <img class=" w-61 h-40 rounded-md" src="${allFruit.image}">
    </div>

    <div class="flex-1">
        <h3 onclick="loadDetails(${allFruit.id})" class="font-bold mt-2 names">${allFruit.name}</h3>
        <p class="text-xs line-clamp-3">${allFruit.description}</p>
          
      <div class="flex justify-between items-center mt-1 pb-2">
        <button class="bg-[#DCFCE7] p-1 rounded-xl text-sm mt-1" >${allFruit.category}</button>
         <p class="font-bold pr"> <span class="font-bd font-bold ">৳</span>${allFruit.price}</p>
        </div>
  <button class="btn w-full rounded-xl mt-2 bg-[#15803D] text-white mt-auto btns">Add To Cart</button>

    </div>

</div>

  </div>
  
`;

  const btn = createNew.querySelector(".btns");
    btn.addEventListener("click", () => {
      const name = allFruit.name;
      const price = Number(allFruit.price);

      // Add to cart array
      cart.push({ name, price });
      total += price;

      // Update UI
      updateCartUI();
    });





 cardContainer.append(createNew)
 });
    
}



const displayCategory = (displays) => {

const categoryContainer = document.getElementById("category-container")
// categoryContainer.innerHTML="";
 categoryContainer.className = "flex flex-col gap-3 ml-40 lg:flex lg:flex-col lg:-ml-1 ";

for(const display of displays ){

   const newDisplay = document.createElement("div")
   newDisplay.innerHTML=`
   
    

   <p id="activeCategory-${display.id}" onclick="loadData(${display.id})" class=" hover:bg-[#15803D] hover:text-white w-35 rounded-sm  removeA  p-1 "> ${display.category_name}</p>


   `

  categoryContainer.append(newDisplay)

}
}
loadFetch()

loadPlants()







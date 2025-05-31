const loadCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/level/5");
  const data = await response.json();
  displayPets(data.data.slice(0, 9)); // Limit to 9 items
};

const displayPets = (data) => {
  const petsContainer = document.getElementById("petsContainer");
  petsContainer.innerHTML = ""; // clear previous content
  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex flex-col justify-center p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <div class="space-y-4 text-center divide-y dark:divide-gray-300">
          <div class="my-2 space-y-1">
            <h2 class="text-xl font-semibold sm:text-2xl">${item.word}</h2>
            <p class="px-5 text-xs sm:text-base dark:text-gray-600">meaning/pronunciation</p>
            <p class="text-xl font-semibold sm:text-2xl">${item.meaning}/${item.pronunciation}</p>
          </div>
          <div class="flex justify-center pt-2 space-x-4 mt-5 gap-70">
            <button class="btn bg-white border-none">
              <i class="fa fa-exclamation-circle"></i>
              
            </button>
            <button><i class='fas fa-volume-up mt-3'></i> </button>
          </div>
        </div>
      </div>
    `;
    petsContainer.appendChild(div);
  });
};

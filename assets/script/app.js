
// remove btn active 
const removeActive=()=>{
    const activeBtn=document.getElementsByClassName("active");
    for(let btn of activeBtn){
        btn.classList.remove("active");
    }
}

const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("vocabulary-container").classList.add("hidden");
}
const hideLoader=()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("vocabulary-container").classList.remove("hidden");
}

// voice world 

function pronounceWord(word) {
    console.log(word);
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // Japanese
    window.speechSynthesis.speak(utterance);
  }

// all levels 
const handleLevels=async()=>{
    try {
        const res=await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data= await res.json();
    showAllLevels(data.data);
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while fetching data. Please try again.",
      });
      }
  }
handleLevels();

// show levels 
const showAllLevels=(levels)=>{
    levels.forEach(level=>{
        const levelContainer=document.getElementById("level-container");
        const div=document.createElement("div");
        div.innerHTML=`
        <button id="btn-${level.level_no}" onclick="handleLevelWord(${level.level_no})"
            class="max-w-max btn flex items-center justify-center gap-2 border border-[#422AD5] rounded-md text-[#422AD5] hover:bg-[#422AD5] hover:text-white hover:cursor-pointer transition duration-100 ease-in-out text-lg font-bold"
          >
            <i class="fa-solid fa-book-open"></i>
            Lesson-${level.level_no}
          </button>
        `
        levelContainer.appendChild(div);
    })
}
// level world 
const handleLevelWord=async(levelNo)=>{
    try {
        showLoader();

        const url=`https://openapi.programming-hero.com/api/level/${levelNo}`
        const res= await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
          }  
        const data= await res.json();
       
        removeActive(); 
        document.getElementById(`btn-${levelNo}`).classList.add("active");

        showWord(data.data); 
        setTimeout(() => {
        hideLoader();
        }, 200); 
         

    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while fetching data. Please try again.",
    });
    }
    setTimeout(() => {
        hideLoader();
      }, 200); 
}


// show word 

const showWord=(words)=>{
    const vocContainer=document.getElementById("vocabulary-container");
    vocContainer.innerHTML="";
    if(words.length===0){
        const div=document.createElement("div");
        div.classList.add("col-span-3")
        div.innerHTML=`
            <div class="flex flex-col justify-center items-center py-28">
            <div>
              <img src="./assets/alert-error.png" alt="" />
            </div>
            <p class="text-sm text-gray-400 my-3">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h4 class="text-4xl font-semibold mt-2">নেক্সট Lesson এ যান</h4>
          </div>
        `
        vocContainer.appendChild(div);
   }else{
    const newWords=words;
   
   newWords.forEach(word=>{
    const div=document.createElement("div");
    div.classList.add("bg-base-100","rounded-lg","p-3");
    div.innerHTML=`
              <div
                class="h-80 border-1 border-gray-100 rounded-lg shadow-inner py-12 px-10 hover:bg-blue-100 flex flex-col justify-between"
              >
                <div class="text-center space-y-2">
                  <h4 class="text-2xl font-bold">${word.word}</h4>
                  <p class="text-lg font-semibold">Meaning / Pronunciation</p>
                  <p class="text-2xl font-bold text-gray-600">
                    "${word.meaning!==null && word.meaning!== undefined ?`${word.meaning}`:`অর্থ নেই`} / ${word.pronunciation!==null && word.pronunciation!== undefined ?`${word.pronunciation}`:`Pronunciation not found`}"
                  </p>
                </div>
                <div>
                <div class="flex justify-between items-end">
                  <btn onclick="wordDetails(${word.id})"
                    class=" w-12 h-12 bg-gray-100 border border-gray-100 shadow-inner rounded-md hover:cursor-pointer hover:scale-95 hover:bg-gray-300 hover:outline-none hover:border-non transition duration-100 ease-in-out"
                  >
                    <i class="p-3 text-2xl fa-solid fa-circle-info"></i>
                  </btn>
                  <btn onclick="pronounceWord('${word.word}')" 
                    class="w-12 h-12 bg-gray-100 border border-gray-100 shadow-inner rounded-md flex justify-center items-center hover:cursor-pointer hover:scale-95 transition duration-100 ease-in-out"
                  >
                    <i class="fa-solid fa-volume-high"></i>
                  </btn>
                </div>
                </div>
              </div>
    `
    vocContainer.appendChild(div);
   })
   }
   
   
}

// show word details 

const wordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    const res= await fetch(url);
    const data=await res.json();
   showWordDetails(data.data);
}   

const showWordDetails=(word)=>{
    document.getElementById("wordDetails").showModal();
   const detailsContainer=document.getElementById("details-containers");
   const synonymsButtons = word.synonyms && word.synonyms.length > 0 
        ? word.synonyms.map(synonym => `<button class="px-6 py-2 rounded-lg border-none outline-none bg-blue-100 hover:scale-95 transition">${synonym}</button>`).join(" ") 
        : ` `;

   console.log(detailsContainer);
   detailsContainer.innerHTML=`
          <div
                class="border-1 border-blue-100 rounded-lg shadow-inner p-3"
              >
                <div class="space-y-5">
                    <h3 class="text-3xl font-bold">${word.word} ( <i class="fa-solid fa-microphone"></i> : ${word.pronunciation} )</h3>
                    <div>
                        <h5 class="text-lg font-semibold mb-1">Meaning</h5>
                        <p class="font-medium">${word.meaning !== null && word.meaning !== undefined ? `${word.meaning}`:`অর্থ পাওয়া যায়নি`}</p>
                    </div>
                    <div>
                        <h5 class="text-lg font-semibold mb-1">Example</h5>
                        <p>${word.sentence}</p>
                    </div>
                    <div>
                        <h5 class="text-lg font-semibold mb-1">সমার্থক শব্দ গুলো</h5>
                        <div class="flex gap-2 flex-wrap">
                        ${synonymsButtons} 
                    </div>
                    </div>
                </div>
            </div>
   `
}



 
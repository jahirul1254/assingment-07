function openPopup(id) {
      fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(res => res.json())
        .then(res => {
          const data = res.data;
          document.getElementById("wordTitle").innerText = `${data.word} (${data.pronunciation})`;
          document.getElementById("meaningText").innerText = data.banglaMeaning;
          document.getElementById("exampleText").innerText = data.example;

          const similarDiv = document.getElementById("similarWords");
          similarDiv.innerHTML = "";
          data.similarWords.forEach(word => {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.innerText = word;
            similarDiv.appendChild(tag);
          });

          document.getElementById("popupModal").classList.remove("hidden");
        })
        .catch(err => {
          alert(" এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। নেক্সট Lesson এ যান");
          console.error(err);
        });
    }

    function closePopup() {
      document.getElementById("popupModal").classList.add("hidden");
    }

    // Optional: click outside to close
    window.onclick = function(event) {
      const modal = document.getElementById("popupModal");
      if (event.target === modal) {
        closePopup();
      }
    };
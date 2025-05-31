const infoBtn = document.getElementById('infoBtn');
const popup = document.getElementById('popup');
const wordTitle = document.getElementById('wordTitle');
const wordMeaning = document.getElementById('wordMeaning');
const wordExample = document.getElementById('wordExample');
const similarWords = document.getElementById('similarWords');

infoBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/word/5');
    const data = await res.json();

    const wordData = data.data;

    wordTitle.textContent = `${wordData.english} (${wordData.bangla})`;
    wordMeaning.textContent = wordData.meaning;
    wordExample.textContent = wordData.example;
    similarWords.innerHTML = wordData.synonyms.map(w => `<span>${w}</span>`).join(', ');

    popup.classList.remove('hidden');
  } catch (error) {
    alert('Failed to load word data.');
  }
});

function closePopup() {
  popup.classList.add('hidden');
}

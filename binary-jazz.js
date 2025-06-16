/* binary-jazz.js – fetches a new genre */
document.addEventListener('DOMContentLoaded', () => {
    const btn  = document.getElementById('generate-btn');
    const card = document.getElementById('genre-card');
    const text = document.getElementById('genre-text');
  
    async function fetchGenre() {
      btn.disabled = true;
  
      try {
        const res = await fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/1/');
        if (!res.ok) throw new Error('Network response was not ok');
  
        const data  = await res.json();
        const genre = Array.isArray(data) ? data[0] : data;
        text.textContent = genre;
  
        card.classList.remove('animate');
        void card.offsetWidth;  
        card.classList.add('animate');
      } catch (err) {
        text.textContent = '⚠️ Could not fetch genre';
        console.error(err);
      } finally {
        btn.disabled = false;
      }
    }
  
    btn.addEventListener('click', fetchGenre);
  
    fetchGenre();
  });
  
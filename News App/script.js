let apiKey = "1fd32875fc094b70ab89a51ead2a5ddc";

//API Used: http://newsapi.org/
//https://newsapi.org/v2/top-headlines?country=us&apiKey=

const container = document.querySelector(".container");

const optionsContainer = document.querySelector(".options-container");

const country = "us";
const options = ["general","health","science","technology"];

//const options = [
  //  "general",
   // "entertainment",
   // "health",
   // "science",
   // "sports",
   // "technology",
  //];

let requestURL;

//create cards from data

const generateUI = (articles) => {
    for (let item of articles){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
        </div>
        <div class="news-content"> 
          <div class="news-title">
             ${item.title}
          </div>
          <div class="news-description">
          ${item.description || item.content || ""} 
          </div>
          <a href="${item.url}" target="_blank"
          class="view=button">Read More</a>
        </div>`;
       container.appendChild(card);
    }
 
};

const getNews = async () => {
    container.innerHTML ="";
    let response = await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
}

//Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
      element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
  };
  
  //Options Buttons
  const createOptions = () => {
    for (let i of options) {
      optionsContainer.innerHTML += `<button class="option ${
        i == "general" ? "active" : ""
      }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
  };

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};


window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
     init();
}
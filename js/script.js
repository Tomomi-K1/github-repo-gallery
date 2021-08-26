//variable to select div with a class of "overview"
const overview = document.querySelector(".overview");
//variable for github username
const username = "Tomomi-K1";
//variable to select ul
const repoList = document.querySelector(".repo-list");
//variable to select a class of ".repos"
const repoArea = document.querySelector(".repos");
//variable to select a class of ".repo-data"
const repoDataArea = document.querySelector(".repo-data");
//variable to select back button
const backButton = document.querySelector(".view-repos");
//variable: select input
const filterInput = document.querySelector(".filter-repos");

//console.log(backButton, inputArea);



//create function to fetch github profile info
const getProfileData = async function(username){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);

    //call function to display profile data
    displayData(data);
};

getProfileData(username);

//create function to display fetched user data
const displayData = function(data){
    const div = document.createElement("div");
    div.classList.add("user-info");
     div.innerHTML = `
        <figure>    
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>   
        <div>
        <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Bio:</strong> ${data.bio}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
        `;
    overview.append(div);

    getRepoList();
};

//fetch repo list data
const getRepoList = async function(){
    const repo = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const repos = await repo.json();
    console.log(repos);

    displayRepos(repos);
};


const displayRepos = function(repos){
    filterInput.classList.remove("hide");
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};

repoList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        const repoName =e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo  = async function(repoName){
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);
    //getting language info
    const fetchLangages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLangages.json();
    console.log(languageData);

    //make a list of languages
    const languages = [];
    for(let language in languageData){
        languages.push(language);
        console.log(languages);
    };

    displaySingleRepoInfo(repoInfo, languages);
};

const displaySingleRepoInfo = function(repoInfo, languages){
    backButton.classList.remove("hide");
    repoDataArea.innerHTML = "";
    repoDataArea.classList.remove("hide");
    repoArea.classList.add("hide");
    //create "div" and insert repo info
    const infoArea = document.createElement("div");
    infoArea.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoDataArea.append(infoArea);
};

backButton.addEventListener("click", function(){
    repoDataArea.classList.add("hide");
    repoArea.classList.remove("hide");
    backButton.classList.add("hide");
});

//Dynamic Search
filterInput.addEventListener("input", function(e){
    const searchWord = e.target.value;
    //console.log(searchWord);
    const repos = document.querySelectorAll(".repo");
    //console.log(repos);
    const lowercaseWord = searchWord.toLowerCase();
    //console.log(lowercaseWord);
    
    for (const repo of repos){
       const lowerText = repo.innerText.toLowerCase(); 
       if(lowerText.includes(lowercaseWord)){
           repo.classList.remove("hide");
       } else {
           repo.classList.add("hide");
       }
    }
  
});



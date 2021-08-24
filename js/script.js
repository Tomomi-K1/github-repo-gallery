//variable to select div with a class of "overview"
const overview = document.querySelector(".overview");
//variable for github username
const username = "Tomomi-K1";
//variable to select ul
const repoList = document.querySelector(".repo-list");
console.log(repoList);

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
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};

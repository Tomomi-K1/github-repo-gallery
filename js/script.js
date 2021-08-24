//create variable that selects div with a class of "overview"
const overview = document.querySelector(".overview");
//create variable for github username
const username = "Tomomi-K1";

//create function to fetch github profile info
const getProfileData = async function(username){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);

    //call function to display profile data
    displayData(data);
}

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
        `
    overview.append(div);
};

const apiEP = "https://randomuser.me/api/?results=21";

let userList = [];
const listElm = document.getElementById("list");
// const CountElm = document.getElementById("count");
// const fetchUser = (url) => { fetch
const fetchUser = async (url) => {
  try {
    // promise using fetch to fetch data from any server, fetch
    //   const dt = fetch(url);
    //   fetch(url)
    //     .then((dt) => {
    //       //   console.log(dt);
    //       return dt.json();
    //     })
    //     .then((data) => {
    //       //   console.log(data);
    //       userList = data.results;
    //       display(userList);
    //     });

    const dt = await fetch(url);
    const data = await dt.json();
    userList = data.results;
    display(userList);
  } catch (error) {
    console.log(error);
  }
};
fetchUser(apiEP);

const display = (users) => {
  console.log(users);

  let str = "";
  users.map((item, i) => {
    console.log(item);
    str += `     
    <div class="card flex-grow-1" style="width: 18rem">
      <img
        src="${item?.picture?.large}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${item.name.title} ${item.name.first} ${item.name.last}</h5>
        <div class="card-text">
          <ul class="list-unstyled">
          <li> <i class="fa-solid fa-mobile"></i> ${item.phone}</li>
            <li > <i class="fa-regular fa-envelope"></i>${item.email} </li>
            
            <li><i class="fa-solid fa-location-dot"></i>${item.location.city},${item.location.state},${item.location.street.number}, ${item.location.country}</li>
          </ul>
        </div>
      </div>
    </div>

    
  </div>`;
  });
  listElm.innerHTML = str;
  console.log(users.length);
  document.getElementById("count").innerText = users.length;
};

const handleOnGenderSelect = (e) => {
  const g = e.value;
  const url = `${apiEP}&gender=${g}`;
  fetchUser(url);
};

const func = (e) => {
  //   const { value } = e.target;
  console.log(e.value);
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  //   console.log(value);
  const filteredArg = userList.filter((usr) => {
    const fulName = `${usr.name.first} ${usr.name.last}`.toLowerCase();

    if (fulName.includes(value.toLowerCase())) {
      return true;
    }
  });

  display(filteredArg);
});

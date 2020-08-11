// loadItems() 를 실행할거에요.
// 데이타를 동적으로 읽어야하니깐 시간이 더 걸리니깐 그냥 아이템스가 아니라 프로미스를 리턴할꺼예요.
//  성공적으로 못 받으면 캐치를 사용하여 사용자에게 알람을 줄꺼에요.
//  loadItems 아이템스를 잘 받아오면 아이템스를 함수에 전달해주어서 버튼을 눌르면 필터링을 해야겠죠
//  이렇게 알고리즘이 구성되어 있습니다.

// Fetch the items from the JSON File
function loadItems() {
    return fetch("data/data.json")
        .then((responese) => responese.json())
        .then((json) => json.items); //  response의 오브젝트에 있는 json()API를 활용하여 response의 body를 jason의 오브젝트로 변환할꺼에요.
}

//Update the list with the given items
function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

//Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.artist}" class="item__thumbnail" />
        <p class="item__description"><h1>${item.artist}<h1><h2>${item.title}</h2><h3>${item.type}</h3>${item.info}</p>
    </li>    
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    const filtered = items.filter((item) => item[key] === value);
    displayItems(filtered);
}

function setEventListeners(items) {
    const buttons = document.querySelector(".buttons");
    buttons.addEventListener("click", (event) => onButtonClick(event, items));
}
//  main
loadItems()
    .then((items) => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);

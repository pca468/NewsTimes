const API_KEY = ``
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsCategory(event)))

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if(inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const getLatesNews = async() => {
    const url = new URL(`https://kimsnewstimes.netlify.app/top-headlines`
    );// &apiKey=${API_KEY}

console.log("uuu", url)

const response = await fetch(url); // await => 이 함수를 일시정지 해줄래? 그 다음 call stack이 없을 때 다시 실행
const data = await response.json() // json은 객체를 텍스트화 시킨것
newsList = data.articles
render();

console.log("rrr", response) // pending 아직 결과가 안나왔다. 기다려줘...!
console.log("dddd", newsList)
};

const getNewsCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category",category)
    const url = new URL(`https://kimsnewstimes.netlify.app/top-headlines?category=${category}`
    );

    const response= await fetch(url)
    const data = await response.json()
    console.group("Ddd" , data);

    newsList = data.articles
    render()
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    console.log("www", keyword)
    const url = new URL(`https://kimsnewstimes.netlify.app/top-headlines?q=${keyword}`
    );

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    newsList = data.articles
    render()
}

const render = () => {
    const newsHTML = newsList.map(
        news => `
            <div class = "row news">
                <div class = "col-lg-4">
                    <img class = "news-img-size" 
                    src=${news.urlToImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                    }>
                </div>
                    <div class ="col-lg-8">
                        <h2>${news.title}</h2>
                        <p>${
                            news.description == null || news.description== ""
                        ?"내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0,200) + "..."
                        : news.description
                    }</p>
                        <div>
                            ${news.source.name || "no source"} * ${moment(
                            news.publishedAt
                            ).fromNow()}
                        </div>
                    </div>
            </div>`
            )
            .join(""); // 배열을 string으로 바꾸어준다.
        console.log("HTML", newsHTML)
   

    document.getElementById('news-board').innerHTML=newsHTML
}
render();
getLatesNews();


// 동기적 vs 비동기적 동기적은 순차적으로 실행이 되는 것  
// javascript는 동기적 프로그래밍 그래서 시간이 오래걸리는 단점
// 그것을 보완하기 위해 사용하는 것이 Web Api ex) Ajax, fetch, setTimeout, eventhandler)
// 쓰레드 => 어떠한 작업을 해주는 것 javascript는 싱글 쓰레드

//1. 버튼틀에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
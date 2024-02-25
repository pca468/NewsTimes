const API_KEY = ``
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => 
    menu.addEventListener("click", (event) => getNewsCategory(event))
    );

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const getNews = async() => {
    try {
        url.searchParams.set("page", page); // => &page = page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url); // await => 이 함수를 일시정지 해줄래? 그 다음 call stack이 없을 때 다시 실행
        const data = await response.json(); // json은 객체를 텍스트화 시킨것
        if(response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error.message);
    }
};

let url = new URL(`https://kimsnewstimes.netlify.app/top-headlines`)

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
    url = new URL(
        `https://kimsnewstimes.netlify.app/top-headlines`
     );// &apiKey=${API_KEY}

    getNews();
    console.log("rrr", response) // pending 아직 결과가 안나왔다. 기다려줘...!
};

const getNewsCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category",category)
    url = new URL(
        `https://kimsnewstimes.netlify.app/top-headlines?category=${category}`
    );

    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    console.log("www", keyword)
    url = new URL(
        `https://kimsnewstimes.netlify.app/top-headlines?q=${keyword}`
    );

    getNews();
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

const errorRender = (errorMessage) => {
    const errotHTML = `
    <div class="alert alert-danger" role="alert">
       ${errorMessage}
    </div>
    `;
    document.getElementById("news-board").innerHTML = errotHTML;
}

const paginationRender = () => {
    // totalResult,
    // page,
    // pageSize
    // groupSize
    // totalpages
    const totalPages = Math.ceil(totalResults / pageSize);
    // pageGroup
    const pageGroup = Math.ceil(page / groupSize);
    // lastPage
    const lastPage = pageGroup * groupSize;
    // 마지막 페이지 그룹이 그룹사이즈보다 작다? lastpage = totalpage
    if(lastPage > totalPages) {
        lastPage = totalPages;
    }


    // firstPage
    const firstPage = 
        lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = ` 
    <li class="page-item" onclick="pageClick(1)">
        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
    </li>
    <li class="page-item" onclick = "moveToPage(${page - 1})"> 
        <a class="page-link" href='#js-bottom'>&lt;</a>
        </li>;
    `;

    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" onclick = "moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }


    let last = pageGroup * 5;
    if (last > totalResults) {
      // 마지막 그룹이 5개 이하이면
      last = totalResults;
    }
  let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면

    paginationHTML += `
    <li class="page-item" onclick="pageClick(${page + 1})">
        <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
   </li>
   <li class="page-item" onclick="pageClick(${totalResults})">
        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
   </li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML
}

const moveToPage = (pageNum) => {
    console.log("moveTOPage", pageNum);
    page = pageNum;
    getNews();

};

render();
getLatesNews();


// 동기적 vs 비동기적 동기적은 순차적으로 실행이 되는 것  
// javascript는 동기적 프로그래밍 그래서 시간이 오래걸리는 단점
// 그것을 보완하기 위해 사용하는 것이 Web Api ex) Ajax, fetch, setTimeout, eventhandler)
// 쓰레드 => 어떠한 작업을 해주는 것 javascript는 싱글 쓰레드

//1. 버튼틀에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
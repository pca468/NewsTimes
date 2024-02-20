const API_KEY = ``
let news = []

const getLatesNews = async() => {
    const url = new URL(`https://kimsnewstimes.netlify.app/top-headlines`
    );// &apiKey=${API_KEY}

console.log("uuu", url)

const response = await fetch(url); // await => 이 함수를 일시정지 해줄래? 그 다음 call stack이 없을 때 다시 실행
const data = await response.json() // json은 객체를 텍스트화 시킨것
news = data.articles

console.log("rrr", response) // pending 아직 결과가 안나왔다. 기다려줘...!
console.log("dddd", news)
};

getLatesNews();


// 동기적 vs 비동기적 동기적은 순차적으로 실행이 되는 것  
// javascript는 동기적 프로그래밍 그래서 시간이 오래걸리는 단점
// 그것을 보완하기 위해 사용하는 것이 Web Api ex) Ajax, fetch, setTimeout, eventhandler)
// 쓰레드 => 어떠한 작업을 해주는 것 javascript는 싱글 쓰레드

for(let i = 0; i< 20; i++){
    console.log("after", i)
}
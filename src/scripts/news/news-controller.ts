import { db,get } from "../../firebase/initDB";

const newsControllerBtn = document.querySelector(".news_wrapper")
const newsZone = document.querySelector(".newsZone");

newsControllerBtn.addEventListener("click", () => {
	newsZone.classList.toggle("active");
});


const renderNews = async (outerPlace:HTMLElement) =>{
    let news = await get("news", db).then((doc:any) => {
       return doc
    });

    if(news.length === 0 ) return;
    outerPlace.innerHTML = ""

    news.forEach(({data}:any)=> {
        console.log(data)
        outerPlace.innerHTML+=`
        <div class="new_item">
            <div class="title_new">${data.title}</div>
            <div class="description_new">${data.description}</div>
            <div class="date_new">${data.date}</div>
        </div>
        `
    });
}
renderNews(document.querySelector(".render_place_for_news"))

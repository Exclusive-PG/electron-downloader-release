import { db, get } from "../../firebase/initDB";
//@ts-ignore
import newsLogo from "../../assets/images/news_item.jpg";

const newsControllerBtn = document.querySelector(".news_wrapper");
const newsZone = document.querySelector(".newsZone");

newsControllerBtn.addEventListener("click", () => {
	newsZone.classList.toggle("active");
});

// let array = [
// 	{
// 		date: { seconds: 1663362000, nanoseconds: 834000000 },
// 		description: "Hello everyone.How are u?",
// 		title: "v1.0.2",
//         author:"Dmitry Ilchenko"
// 	},
// 	{
// 		date: { seconds: 1662411600, nanoseconds: 694000000 },
// 		description: "There are many variathere are many variations of passages of Lorem Ipsum available, but the majority have suffhere are many variations of passages of Lorem Ipsum available, but the majority have suffions of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
// 		title: "v2123",
//         author:"Dmitry Ilchenko"
// 	},
// ];

const renderNews = async (outerPlace: HTMLElement) => {
	let news = await get("news", db).then((doc: any) => {
		return doc;
	});
	//let news = array;

	if (news.length === 0) return;
	outerPlace.innerHTML = "";
	//{ data }
	news?.forEach(({data}: any) => {
		console.log(data);
		outerPlace.innerHTML += `
        <div class="news_item">
            <div class="left_block_news">
                <div class="logo_news"><img src="${newsLogo}"/></div>
                <div class="date_news">${toDateTime(data.date.seconds)}</div>
            </div>
            <div class="right_block_news">
                <div class="title_news">${data.title}</div>
                <div class="description_news">${data.description}</div>
                <div class="author_news"> - ${data.author}</div>
            </div>  
        </div>
        `;
	});
};
renderNews(document.querySelector(".render_place_for_news"));

function toDateTime(sec:number) {
    let normalDate = new Date(sec*1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})
    return normalDate;
}
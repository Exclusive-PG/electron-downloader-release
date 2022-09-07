import "./scripts/headerController";
import "./assets/scss/index";
import "./scripts/downloadVideo";
import "./scripts/settings/settings-panel-switcher";
import "./scripts/settings/config-settings-controller";
import "./scripts/settings/video-settings-controller";
import "./scripts/data-collection/DataCollection";
import "./scripts/data-collection/data-page";
import "./scripts/playlist/playlist";
import "./scripts/home";
import "./scripts/background/background"
import "./scripts/news/news-controller"
//db
//import "./firebase/init"
//import "./firebase/initDB"
import "./scripts/appController/app"

const loader = document.querySelector<HTMLElement>(".loaderPage");
const delay = 3000;
document.addEventListener("DOMContentLoaded", ()=>pageLoaded(loader));

function pageLoaded(loader:HTMLElement) {
   setTimeout(() => {
    loader.classList.add("done")
   }, delay);
}

import { os } from "./requiredLib";

const Greeting = (msg: string) => {
	document.querySelector(".content-home").textContent = msg;
};

let randomSentense = ["Welcome back", "Hi" ]

Greeting(`${randomSentense[Math.floor(Math.random() * randomSentense.length)]} , ${os.userInfo().username}`);


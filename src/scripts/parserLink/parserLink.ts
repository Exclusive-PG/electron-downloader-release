export default class ParserLink {
	public readonly YOUTUBE_VALIDATE_LINK = [
		"https://www.youtube.com/watch?v=",
		"https://youtu.be/",
		"exclusive-ytd://https://www.youtube.com/watch?v=",
		"https://www.youtube.com/shorts/",
	];
	public readonly SEPARATE_SYMBOLS = ["&list", "?list"];

	public parse(link: string) {
		if (link === undefined) return;
		console.log(link);
		let res: any = link;
		let typeVideo: "shorts" | "video" = "video";

		this.YOUTUBE_VALIDATE_LINK.forEach((validateLink: string): string => {
			if (link.includes(validateLink)) {
				res = link.replace(validateLink, "");
				return res;
			}
			if (link.includes("shorts")) typeVideo = "shorts";
		});

		this.SEPARATE_SYMBOLS.forEach((separateSymbol: string) => {
			if (res.includes(separateSymbol)) {
				res = res.split(separateSymbol)[0];
			}
		});

		return {
			url: res,
			typeVideo,
		};
	}
}
//https://youtu.be/3wxyN3z9PL4?list=RDp47fEXGabaY
//https://youtu.be/3wxyN3z9PL4?list=RDp47fEXGabaY&t=136
// https://www.youtube.com/watch?v=3wxyN3z9PL4&list=RDp47fEXGabaY&index=10
//exclusive-ytd://https://www.youtube.com/watch?v=WvK2y-mFtCc

// if(link.includes(validateLink) && link.includes(this.SEPARATE_SYMBOLS[0])){
//     res = link.split(this.SEPARATE_SYMBOLS[0]);
//     return res[1].includes("&") ? res[1].split("&")[0] : res[1]
// }
// else if(link.includes(validateLink)){
// return res[1].includes("&") ? res[1].split("&")[0] : res[1]
// }
// else{
// return res;
// }

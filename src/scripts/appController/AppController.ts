export default class AppController {

	private Scripts: Array<Function> = [];

	public pushScript(script: Function) {
		this.Scripts.push(script);
	}
	public pushArrayOfScripts(scripts: Array<Function>) {
		this.Scripts = [...this.Scripts, ...scripts];
	}
	public startApp() {
		console.log(this.Scripts);
		this.Scripts.forEach((script) => {
			script();
		});
	}
 
}

export const commands: Command[] = [];

export class Command {
	name: string;
	callback: (args: string[]) => void | boolean;
	unlisted?: boolean;
	constructor(name: string, callback: (args: string[]) => void | boolean, unlisted?: boolean) {
		this.name = name;
		this.callback = callback.bind(this);
		this.unlisted = unlisted;
		commands.push(this);
	}
}

export function newLine(dontClear?: boolean) {
	const input = document.getElementById("input")!;
	const terminal = document.getElementById("terminal")!;
	input.id = "";
	terminal.innerHTML += "<div class=\"line\"><span class=\"hostname\">[madeline@b0ss.net <span class=\"directory\">~</span>]</span><span class=\"bash\">$ </span><span id=\"input\"><span class=\"command\"></span><span class=\"param\"></span></span></div>";
	if (dontClear) {
		document.getElementById("input")!.innerText = input.innerText;
	}
}

export function execute(text: string) {
	const parsed = text.trim().replace("./", "./ ").split(" ");
	const terminal = document.getElementById("terminal");
	const command = commands.find(cmd => cmd.name === parsed[0]);
	if (command) {
		command.callback(parsed.slice(1).filter(a => a !== "" && a !== " "));
		return;
	}
	terminal?.append(`mash: ${parsed[0]}: command not found`);
}
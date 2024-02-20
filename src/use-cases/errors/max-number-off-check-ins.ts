export class MaxNumberCheckInsError extends Error {
	constructor(){
		super("Max numbers checkins reached");
	}
}
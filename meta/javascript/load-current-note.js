module.exports = async () =>
{
	const text = await navigator.clipboard.readText();
	window.open(window.open(text));
}
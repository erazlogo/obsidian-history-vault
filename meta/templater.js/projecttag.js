function projecttag(tp) {
	string = tp.file.tags.filter((tag) => tag.includes("#project")).join("\n");
    return string;
}
module.exports = projecttag
function header(tp) {
    string=tp.file.content;
    headertext=string.substring(0, string.indexOf("### Note")+10);
    return headertext
}
module.exports = header
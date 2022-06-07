function header(tp) {
    string=tp.file.content;
    string2=tp.file.selection();
    headertext=string.substring(0, string.indexOf("# Annotations"));
    pageno=string2.substring(string2.indexOf("?page=")+6, string2.indexOf("&annotation"));
    headertext2=headertext.replace("page-no::", "page-no:: "+pageno)
     return headertext2
}
module.exports = header
function header(tp) {
    content=tp.file.content;
    selection=tp.file.selection();
    getheader=content.substring(0, content.indexOf("### Note")+10);
    pageno=selection.substring(selection.indexOf("?page=")+6, selection.indexOf("&annotation"));
    headerwithpageno=getheader.replace("page-no::", "page-no:: "+pageno);
     return headerwithpageno;
}
module.exports = header
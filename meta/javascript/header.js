function header(tp) {
    content=tp.file.content;
    selection=tp.file.selection();
    getheader=content.substring(0, content.indexOf("### Note")+10);
    pageno=selection.substring(selection.indexOf("?page=")+6, selection.indexOf("&annotation"));
    oldpageno=getheader.substring(getheader.indexOf("page-no:: ")+10, getheader.indexOf("\n", getheader.indexOf("page-no:: ")+10));
    headerwithpageno=getheader.replace("page-no:: "+oldpageno+"\n", "page-no:: "+pageno+"\n");
     return headerwithpageno;
}
module.exports = header;
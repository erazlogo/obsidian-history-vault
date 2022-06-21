keyword:: cuba

author:: 
recipient:: 
title:: 
publication:: 
date:: 
archive:: 
archive-location:: 

note-title:: 
start-date:: 
end-date:: 
comment:: 
tag:: 

sortby:: start-date
sortorder:: desc

```dataviewjs
await dv.view("meta/dataview", { keyword: dv.current().keyword, author: dv.current().author, recipient: dv.current().recipient, title: dv.current().title, publication: dv.current().publication, date: dv.current().date, archive: dv.current().archive, archivelocation: dv.current()["archive-location"], notetitle: dv.current()["note-title"], startdate: dv.current["start-date"], enddate: dv.current()["end-date"], comment: dv.current().comment, tag: dv.current().tag, sortby: dv.current().sortby, sortorder: dv.current().sortorder });
```

Keyword search finds a word or phrase in the entire note text + note title.
For text fields, this is a case-insensitive phrase search. 
Enter dates as `YYYY-MM-DD`, `<YYYY-MM-DD` and `>YYYY-MM-DD`.
Enter tag as `#tag`.  
Enter exact field title and asc/desc to change sort order.

%%Enter `cuba` in the keyword field to find two sample research notes.%%
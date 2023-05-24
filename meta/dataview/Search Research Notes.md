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
tags:: 

sortby:: start-date
sortorder:: desc

```dataviewjs
await dv.view("meta/dataview/search-research-notes", {});
```

Keyword search finds a word or phrase in the entire note text + note title.
For text fields, this is a case-insensitive phrase search. 
Enter dates as `YYYY-MM-DD`, `<YYYY-MM-DD` and `>YYYY-MM-DD`.
Enter tags as `#tag1 #tag2`.
Enter exact field title and `asc/desc` to sort by field. 
Leave sort fields blank to sort by `note-title, desc`.

%%Enter `cuba` in the keyword field to find two sample research notes.
To see the graph and backlinks for a found note, click on the note title, then use `Ctrl-N` hotkey.%%
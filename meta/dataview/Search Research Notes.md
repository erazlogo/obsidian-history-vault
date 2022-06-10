
```dataview
TABLE WITHOUT ID length(rows) AS "Total Research Notes"
FROM "01 notes"  
GROUP by true
```
author:: 
recipient:: 
title:: 
publication:: 
archive:: 
comment:: 
SortBy:: start-date
SortOrder:: asc

```dataviewjs
const current = dv.current();

if (current.author || current.title || current.recipient || current.publication || current.archive || current.comment || current["start-date"] || current["end-date"]) {
    function passes(page) {
        return (!current.author || (page.author && page.author.includes(current.author)))
            && (!current.recipient || (page.recipient && page.recipient.includes(current.recipient)))
            && (!current.title || (page.title && page.title.includes(current.title)))
            && (!current.publication || (page.publication && page.publication.includes(current.publication)))
            && (!current.date || (page.date && page.date==current.date))
            && (!current.archive || (page.archive && page.archive.includes(current.archive)))
            && (!current.comment || (page.comment && page.comment.includes(current.comment)))
            && (!current["start-date"] || (page["start-date"] && page["start-date"]==current["start-date"]))
            && (!current["end-date"] || (page["end-date"] && page["end-date"]==(current["end-date"])))
            ;
    }

    dv.table(
        ["Note", "Start Date", "End Date", "Author", "Recipient", "Title", "Publication", "Date", "Pages", "Archive", "Loc. in Archive", "Comment"],
        dv.pages('"01 notes"')
            .where(passes)
            .sort(p => p[current.SortBy], current.SortOrder)
            .map(p => [
                p.file.link,
                p["start-date"],
                p["end-date"],
                p.author,
                p.recipient,
                p.title,
                p.publication,
                p.date,
                p["page-no"],
                p.archive,
                p["archive-location"],
                p.comment
            ])
    );
} else {
    dv.paragraph("   Enter search terms into one or more fields to find research notes. This is a case-sensitive phrase search. Enter exact field title and asc/desc to change sort order.");
}
```
%%Type `Cuba` in Comment field to find both sample notes from the "01 notes" folder.%%
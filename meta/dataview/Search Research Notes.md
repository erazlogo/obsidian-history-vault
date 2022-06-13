author:: 
recipient:: 
title:: 
publication:: 
date:: 
archive:: 
archive-location:: 
comment:: 
start-date:: 
end-date:: 
tag:: 
sortby:: start-date
sortorder:: asc

```dataviewjs
const current = dv.current();
const cdate = new Date(dv.current().date).getTime();
const cstartdate = new Date(dv.current()["start-date"]).getTime();
const cenddate = new Date(dv.current()["end-date"]).getTime();
const searchterm = dv.current().tag === null ? '"01 notes"' : '"01 notes" and '+dv.current().tag; 

if (current.author || current.title || current.recipient || current.publication || current.date || current.archive || current["archive-location"] || current.comment || current["start-date"] || current["end-date"] || current.tag) {

    function passes(page) {
        return (!current.author || (page.author && page.author.includes(current.author)))
            && (!current.recipient || (page.recipient && page.recipient.includes(current.recipient)))
            && (!current.title || (page.title && page.title.includes(current.title)))
            && (!current.publication || (page.publication && page.publication.includes(current.publication)))
	        && (!current.date || (page.date && new Date(page.date).getTime()===cdate))
            && (!current.archive || (page.archive && page.archive.includes(current.archive)))
            && (!current["archive-location"] || (page["archive-location"] && page["archive-location"].includes(current["archive-location"])))
            && (!current.comment || (page.comment && page.comment.includes(current.comment)))
            && (!current["start-date"] || (page["start-date"] && new Date(page["start-date"]).getTime()===cstartdate))
            && (!current["end-date"] || (page["end-date"] && new Date(page["end-date"]).getTime()===cenddate))
            ;
    }

    dv.table(
        ["Note", "Start Date", "End Date", "Author", "Recipient", "Title", "Publication", "Date", "Pages", "Archive", "Loc. in Archive", "Comment"],
        dv.pages(searchterm)
            .where(passes)
            .sort(p => p[current.sortby], current.sortorder)
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
    dv.paragraph("   Enter search terms into one or more fields to find research notes.");
}
```

For text fields, this is a case-sensitive phrase search. 
Enter dates as YYYY-MM-DD. 
Enter tag as `#tag`.  
Enter exact field title and asc/desc to change sort order.

%%Enter `Cuba` in the comment field to find two sample research notes.%%
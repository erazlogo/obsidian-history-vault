const current = dv.current();
const cdate = new Date(dv.current().date).getTime();
const cstartdate = new Date(dv.current()["start-date"]).getTime();
const cenddate = new Date(dv.current()["end-date"]).getTime();
const searchterm = dv.current().tag === null ? '"01 notes"' : '"01 notes" and '+dv.current().tag;

if (current.keyword || current.author || current.recipient || current.title || current.publication || current.date || current.archive || current["archive-location"] || current["note-title"] || current["start-date"] || current["end-date"] || current.comment || current.tag) {

    function passes(page) {
        return (!current.author || (page.author && page.author.toLowerCase().includes(current.author.toLowerCase())))
            && (!current.recipient || (page.recipient && page.recipient.toLowerCase().includes(current.recipient.toLowerCase())))
            && (!current.title || (page.title && page.title.toLowerCase().includes(current.title.toLowerCase())))
            && (!current.publication || (page.publication && page.publication.toLowerCase().includes(current.publication.toLowerCase())))
	        && (!current.date || (page.date && new Date(page.date).getTime()===cdate))
            && (!current.archive || (page.archive && page.archive.toLowerCase().includes(current.archive.toLowerCase())))
            && (!current["archive-location"] || (page["archive-location"] && page["archive-location"].toLowerCase().includes(current["archive-location"].toLowerCase())))
            && (!current["note-title"] || (page.file.name && page.file.name.toLowerCase().includes(current["note-title"].toLowerCase())))
           && (!current.comment || (page.comment && page.comment.toLowerCase().includes(current.comment.toLowerCase())))
            && (!current["start-date"] || (page["start-date"] && new Date(page["start-date"]).getTime()===cstartdate))
            && (!current["end-date"] || (page["end-date"] && new Date(page["end-date"]).getTime()===cenddate))
            ;
    }

function keyword(page) {
        return (!current.keyword || (page.content && page.content.toLowerCase().includes(current.keyword.toLowerCase()))
        || (page.notetitle && page.notetitle.toLowerCase().includes(current.keyword.toLowerCase())))

}

const pages = await Promise.all(
    dv.pages(searchterm)
    .where(passes)
    .sort(p => p[current.sortby], current.sortorder)
    .map(page => new Promise(async (resolve, reject) => {
        const content = await dv.io.load(page.file.path);
        resolve({
            link: page.file.link,
            startdate: page["start-date"],
            enddate: page["end-date"],
            author: page.author,
            recipient: page.recipient,
            title: page.title,
            publication: page.publication,
            date: page.date,
            pageno: page["page-no"],
            archive: page.archive,
            archivelocation: page["archive-location"],
            notetitle: page.file.name,
            comment: page.comment,
            content
        });
    }))
);

    dv.table(
        ["Note", "Start Date", "End Date", "Author", "Recipient", "Title", "Publication", "Date", "Pages", "Archive", "Loc. in Archive", "Comment"],
            pages
            .filter(keyword)
            .map(p => [
                p.link,
                p.startdate,
                p.enddate,
                p.author,
                p.recipient,
                p.title,
                p.publication,
                p.date,
                p.pageno,
                p.archive,
                p.archivelocation,
                p.comment
            ])
    );
} else {
    dv.paragraph("   Enter search terms into one or more fields to find research notes.");
}
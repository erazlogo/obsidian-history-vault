This is a starter vault for historical research with Zotero and Obsidian. To download, click on the "Code" button on the Github page.

For directions on how to use this vault, go to [Doing History with Zotero and Obsidian](https://publish.obsidian.md/history-notes/).

This vault will be updated frequently during the summer of 2023. To migrate to a newer version, just move your notes into matching folders in the new vault. 

## Advanced Features and Best Practices for Historians
- Combine free-form "Zettelkasten" linking of ideas with structured data necessary to know who did what and when.
- [Import your PDF annotations](https://github.com/erazlogo/obsidian-history-vault#import-your-annotations-from-zotero) from Zotero into Obsidian, including __archive, archive-location, and recipient__ fields. This feature incorporates archival research, including private correspondence.
- [Split the resulting "literature note" into atomic "research notes"](https://github.com/erazlogo/obsidian-history-vault#extract-an-annotation-as-an-atomic-research-note) that will be later sorted into groups for writing. Different annotations from the same source might belong in different places in your draft.
- [Search and sort research notes by source metadata](https://github.com/erazlogo/obsidian-history-vault#search-and-sort-your-notes-by-source-fields); by note title, creation date, and modification date; by date of event described in the note, your comments, tags, and by keyword (everything in the note and note title) in a familiar interface structured like a library catalog search.
- Trace social networks: create and link person, place, and event notes and visualize with the Graph view

## Showcase of features available in this vault

### Import your annotations from Zotero 

The imported "literature note" includes Zotero item metadata, Zotero tags, and a predefined template for working with notes.

![Alt Text](https://publish-01.obsidian.md/access/36bec6aea73b5930cec9761dd7c60012/00%20meta/attachments/imported%20note.png)

### Extract an annotation as an atomic "research note" 

Extract an annotation from your imported annotations file (literature note). The new note will include all source information and the template for working with notes. The script includes a prompt for setting new note title and places a link to the new note in your original annotations file.

![Alt Text](https://publish-01.obsidian.md/access/36bec6aea73b5930cec9761dd7c60012/00%20meta/attachments/extract%20research%20note.gif)

### Search and sort your notes by source fields 

- Sort your research notes and literature notes by fields dynamically. 
- Keyword search finds a word or phrase in the entire note text + note title.
- For text fields, this is a case-insensitive phrase search. 
- Enter dates as `YYYY-MM-DD`, `<YYYY-MM-DD` and `>YYYY-MM-DD`.
- Enter tags as `#tag1 #tag2`.
- Enter exact field title and `asc/desc` to sort by field. 
- Leave sort fields blank to sort by `note-title, desc`.

![Alt Text](https://publish-01.obsidian.md/access/36bec6aea73b5930cec9761dd7c60012/00%20meta/attachments/search%20research%20notes.gif)

### Acknowledgments

This vault's special features would have been impossible without these plugins:
- [Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration)
- [Templater](https://github.com/SilentVoid13/Templater)
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Kanban](https://github.com/mgmeyers/obsidian-kanban)
- [Longform](https://github.com/kevboh/longform)
%%This is a recent notes list sorted by date modified, included in the "Working with notes" workspace. You can put note Backlinks or an Outline in this space instead.%%
```dataview
TABLE without ID
	file.link as ""
FROM -"meta"
WHERE file.name != this.file.name 
SORT file.mtime DESC
LIMIT 20
```
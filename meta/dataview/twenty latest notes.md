
```dataview
TABLE without ID
	file.link as ""
FROM -"meta"
WHERE file.name != this.file.name 
SORT file.mtime DESC
LIMIT 20
```
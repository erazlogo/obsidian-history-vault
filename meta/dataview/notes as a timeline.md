
```dataview
TABLE WITHOUT ID length(rows) AS "Count"
FROM "1. Notes" AND #source 
WHERE start-date
GROUP by true
```
```dataview
TABLE
	start-date AS "Event Start Date",
	end-date AS "Event End Date",
	author AS "Author",
	title AS "Title",
	publication AS "Publication",
	date AS "Date",
	page-no AS "Page"
FROM "01 notes"
WHERE start-date
SORT start-date DESC, end-date ASC, date ASC
```


==In this table, you see all notes from primary and secondary sources that include a start-date field. 
You are narrowing your search by folder and tag. Two notes currently come up. 
They are sorted by start-date (ascending), end-date (ascending), source date (ascending).== 

==Click on the eyeglasses icon above to change to the edit view. 
Then roll your mouse over the table and click on the "</>" icon. 
You will be able to edit the search code.==

==To change the sort order, change the SORT line to:==

<code>SORT start-date ASC, end-date ASC, date DESC</code>

==Click away from the table (for example, click on this line). 
You will see that the order of notes changed. 
Now change the SORT line to what it was originally to restore sort order.==

==To narrow this list, change the WHERE line to:==

<code>WHERE start-date AND contains(author, "Crispi")</code>

==You will see only one note, from Crispi's article. 
(You need to change the "Count" table separately to get the correct record count.) 
Now change the WHERE line to what it was originally. You will see two records again.==

==To widen this list, change the FROM line to:==

<code>FROM "1. Notes"</code>

==You will see five notes--all notes in your vault that include a start-date field. 
Try narrowing this list by other variables, for example, to view events only.
Check out the documentation for the [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) plugin for other options.==



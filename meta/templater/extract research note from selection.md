<%*

const fileName = await tp.system.prompt("New Note Title", "Type your title here", true);

tp.file.create_new(tp.user.header(tp)+tp.file.selection(), fileName, false);

await tp.file.cursor_append("[["+fileName+"]]");

%>
<%*

const fileName = await tp.system.prompt("New Note Title");

tp.file.create_new(tp.user.header(tp)+tp.file.selection(), fileName, false);

await tp.file.cursor_append("[["+fileName+"]]");

%>
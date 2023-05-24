module.exports = {
	description: {
		name: "Re-Index Footnotes",
		description: "Re-Index Footnote Numbering",
		availableKinds: ["Manuscript"],
		options: []
	},

  compile (input, context) {
		let text = input.contents;

		// re-index footnote-definitions
		let ft_index = 0;
		text = text.replace(/^\[\^\S+?]: /gm, function() {
			ft_index++;
			return ('[^' + String(ft_index) + ']: ');
		});

		// re-index footnote-keys
		// regex uses hack to treat lookahead as lookaround https://stackoverflow.com/a/43232659
		ft_index = 0;
		text = text.replace(/(?!^)\[\^\S+?]/gm, function() {
			ft_index++;
			return ('[^' + String(ft_index) + ']');
		});

		input.contents = text;
		return input;
	}

};
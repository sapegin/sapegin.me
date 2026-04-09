interface Section {
	name: string;
	body: string;
}

const sectionRegex = /^#+\s+(.*)/m;

/**
 * Split Markdown string into an array of sections
 */
export function splitBySection(markdown: string): Section[] {
	const sections: Section[] = [];
	const lines = markdown.split('\n');
	let currentSection: Section = { name: '', body: '' };

	for (const line of lines) {
		if (sectionRegex.test(line)) {
			currentSection = {
				name: line.match(sectionRegex)?.[1] ?? '',
				body: '',
			};
			sections.push(currentSection);
		} else {
			currentSection.body += line + '\n';
		}
	}

	// No sections, return the contents as an anonymous section
	if (sections.length === 0) {
		return [currentSection];
	}

	return sections;
}

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode });
		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});
	}
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
	return new Promise((resolve, reject) => {
		graphql(`
			{
				allMarkdownRemark(limit: 100) {
					edges {
						node {
							frontmatter {
								layout
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`).then(result => {
			if (result.errors) {
				reject(result.errors);
			}

			result.data.allMarkdownRemark.edges.forEach(
				({
					node: {
						frontmatter: { layout },
						fields: { slug },
					},
				}) => {
					createPage({
						path: slug,
						component: path.resolve(
							`${__dirname}/src/layouts/${layout || 'Page'}.js`
						),
						context: {
							slug,
						},
					});
				}
			);
			resolve();
		});
	});
};

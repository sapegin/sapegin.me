import { Order } from './Order';

declare namespace GraphQL {
	namespace Model {
		interface Page {
			frontmatter: {
				layout: string;
				title: string;
				orderby: Order;
				limit: number;
			};
			fields: {
				slug: string;
			};
			rawMarkdownBody: string;
		}
	}

	interface Edge {
		node: Model.Page;
	}

	namespace Query {
		interface Pages {
			allMarkdownRemark: {
				edges: Edge[];
			};
		}
	}
}

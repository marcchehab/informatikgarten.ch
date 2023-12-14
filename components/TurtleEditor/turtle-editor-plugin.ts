import { Node } from 'unist';
import { visit } from 'unist-util-visit';

module.exports = async function turtleEditorPlugin() {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'turtle') {
        node.type = 'jsx';

        // Parse the attributes from the meta string
        const attributes = node.meta ? node.meta.split(' ').reduce((attrs: any, attr: string) => {
          const [key, value] = attr.split('=');
          attrs[key] = value.replace(/"/g, '');  // remove quotes from value
          return attrs;
        }, {}) : {};

        node.value = `<TurtleEditor id="${attributes.id || 'default-id'}">\n${node.value}\n</TurtleEditor>`;
      }
    });
  };
};
module.exports = async function turtleEditorPlugin() {
  const visit = (await import('unist-util-visit')).default;

  return (tree) => {
    visit(tree, 'code', (node) => {

      console.log(node);
      if (node.lang === 'turtle') {
        node.type = 'jsx';

        // Parse the attributes from the meta string
        const attributes = node.meta ? node.meta.split(' ').reduce((attrs, attr) => {
          const [key, value] = attr.split('=');
          attrs[key] = value.replace(/"/g, '');  // remove quotes from value
          return attrs;
        }, {}) : {};

        node.value = `<TurtleEditor id="${attributes.id || 'default-id'}">\n${node.value}\n</TurtleEditor>`;
      }
    });
  };
};
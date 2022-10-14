# Workspace

This project contains workspace related scripts and is registered as the default project in the main [nx.json](../../nx.json).
# Compodoc

Run compodoc for all apps and libs. This is required for storybook to work.

```
# Serve compodoc as json
nx run compodoc
nx run compodoc:json.watch

# Serve compodoc as html
nx run compodoc:html.watch
```

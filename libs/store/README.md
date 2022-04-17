# Store

Reactive Stores realized with [NgRx](https://ngrx.io/).

## Basic terminology

- Prefix "ensure" (ex. ensureProductsLoaded): Ensures that the Entities are loaded, i.e. if they are already present, no new http request is made.

## Basic rules

- Don't export too much. E.g., "loadProductsSuccess" is not relevant outside the lib, so it shouldn't be exported.

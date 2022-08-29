# Store

Reactive Stores realized with [NgRx](https://ngrx.io/).

## Basic terminology

- Prefix "ensure" (ex. ensureProductsLoaded): Ensures that the Entities are loaded, i.e. if they are already present, no new http request is made.

## Basic rules

- Don't export too much. E.g., "loadProductsSuccess" is not relevant outside the lib, so it shouldn't be exported.


# Service Wrapper

## Load single entity

The service adds a wrapper around the store. The `get$` method returns an observable that triggers the fetching of the entity from the server. The observable also updates the store with the correct states (loading, success and error).

A second call of `get$` with the same id will return the same observable as the first call.

```mermaid
sequenceDiagram

actor c2 as component2
actor c as component
participant o as load$: Observable
participant se as Service
participant st as Store
participant b as Backend

c->>se: get$(id)
activate se
se->>o: <<create>>
o-->>se: 
se-->>c: load$
deactivate se


c->>o: subscribe()
activate o
o-->>c: 

o->>st: has(id)?
Note over o, st: id ∉ store
st-->>o: false

o->>st: markAsLoading(id)
st-->>o: 

o-)c: { state: "loading" }

o-)b: load$(id)
b--)o: e

o->>st: markAsSuccess(e)
st-->>o: 

o-)c: { state: "success", entity: e }

c2->>se: get$(id)
activate se

se->>se: load$ from cache
se-->>c2: load$
deactivate se
o-)c2: { state: "success", entity: e }

Note over c2,o: Observable stays active until all clients unsubscribe

c2->>o: unsubscribe()
o-->>c2: 
c->>o: unsubscribe()
o-->>c: 

deactivate o
```

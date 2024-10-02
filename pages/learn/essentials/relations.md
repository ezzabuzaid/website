---
title: Relations
layout: learn
---

# Relations

Relations allow you to define relationships between tables, They are declared by using the built-in `field.relation()` declarative.

To use the `field.relation` declarative in your table, you must specify these props in the argument object:

- `refereces`: Here you specify which table does this column relate to using the built-in `useTable()` declarative passing the table name as argument.
- `relationship`: Here you specify the relationship type whether it is `one-to-one` or `many-to-one` according to your needs.

You can also pass a `validations` array which currently only accepts the built-in declarative `mandatory()`.

**Example 1: One-To-One Relation**

Suppose you have two tables, `person` and `address`. You want to establish a one-to-one relation between them.

```typescript
tables: {
    person: table({
        fields: {
            name: field.shortText(),
            addressId: field.relation({ references: useTable('address'), relationship: 'one-to-one' }),
        },
    }),
    address: table({
        fields: {
            street: field.longText(),
            city: field.shortText(),
        },
    }),
}
```

In this example, the `person` table has a field called `addressId`, which is related to the `address` table. Since it's a one-to-one relation, each person can have only one address.

**Example 2: Many-To-One Relation**

Now let's consider two tables, `list` and `item`. You want to establish a many-to-one relation between them.

```typescript
tables: {
    list: table({
        fields: {
            name: field.shortText(),
        },
    }),
    item: table({
        fields: {
            description: field.longText(),
            listId: field.relation({ references: useTable('list'), relationship: 'many-to-one' }),
        },
    }),
}
```

In this case, each list can have multiple items, but each item belongs to only one list. The `listId` field in the `item` table establishes this many-to-one relation.

**Example 3: Many-To-Many Relation**

To establish a many-to-many relation between two tables, you need a junction table. Let's take two tables, `list` and `item`, as an example.

```javascript
tables: {
    list: table({
        fields: {
            name: field.shortText(),
        },
    }),
    item: table({
        fields: {
            description: field.longText(),
        },
    }),
    listItemLink: table({
        fields: {
            itemId: field.relation({ references: useTable('item'), relationship: 'many-to-one' }),
            listId: field.relation({ references: useTable('list'), relationship: 'many-to-one' }),
        },
    }),
}
```

In this scenario, the `listItemLink` table serves as a junction between `list` and `item`. Each item can be associated with multiple lists, and each list can have multiple items. The `itemId` and `listId` fields in the `listItemLink` table establish the many-to-many relation.

These examples demonstrate how relations work in January. By using the `field.relation()` declarative, you can now easily define complex relationships between your tables.

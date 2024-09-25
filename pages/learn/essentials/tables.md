---
title: Tables
layout: learn
---

## Table

A table translates to the corresponding database extension table. Essentially, It is a collection of records that share the same structure. For example, a table named `orders` can have records with columns like `id`, `name`, `price`, etc.

Speaking in terms of the generated code. It is the ORM model that represents the table in the database.

You can define a table by using the `table` function.

```ts
feature('OrdersFeature', {
  workflows: [],
  tables: {
    orders: table({
      fields: {
        name: field({ type: 'short-text' }),
        price: field({ type: 'price' }),
      },
    }),
  },
});
```

Say you've installed a database extension that uses "TypeORM" then the above code will translates to

```ts
@Entity()
export class Orders {
  @Column()
  name: string;

  @Column()
  price: number;
}
```

The table function composed of the following elements:

1. Name that identifies the table.
2. Fields that define the columns of the table.

### What is a field?

A field is a column in the table. It defines the type of data that can be stored in the column and the validation rules that apply to the data.

```ts
field({ type: 'long-text' });
```

There are two kind of fields:

- Semantic fields: These fields are used to store data that has a specific meaning and usually have implicit validation. For example, `short-text`, `email`, and `price`.
- Generic fields: These fields are used to store data that doesn't have a specific meaning. For example, `integer`, `decimal`, and `json`.

Semantical fields are common across all database extensions, while generic fields are specific to the database extension.

- `short-text`: A short text field that can store up to 255 characters.
- `long-text`: A free form field that can store up to the database limit.
- `email`: A field that stores an email address.
- `local-tel`: A field for storing local telephone numbers.
- `international-tel`: A field for storing international or local telephone numbers.
- `date`: A field for storing date values.
- `time`: A field for storing time values in the format hh:mm:ss.
- `datetime`: A field for storing combined date and time values.
- `password`: A field for storing passwords with validation for security.
- `url`: A field for storing URLs and validating their format.
- `boolean`: A field for storing boolean values (true or false).
- `percentage`: A field for storing percentage values with optional precision.
- `price`: A field for storing monetary values with currency precision.
- `latitude`: A field for storing latitude coordinates.
- `longitude`: A field for storing longitude coordinates.
- `uuid`: A field for storing universally unique identifiers (UUIDs).

The configuration for each field can be found in the installed database extension documentation.

### Validations

The following list of validations can be applied to a field:

- `required`: ensures that the field is present and not empty (aka non nullable).

- `unique`: ensures that the field value is unique across all records in the table. a unique fields is also required.

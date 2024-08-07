---
date: '2021-08-06T00:00:00'
title: Advance Angular Dynamic Component
category: javascript-bites
layout: blog-post
author: ezzabuzaid
---

In this article, I will show you how you can still use inputs and outputs and support OnChanges lifecycle while creating dynamic components.

If you don't know about dynamic components yet, I recommend this article [Dynamically Creating Components with Angular](https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d) before going forward.

For clarity about what I’m going to talk about, the [project](https://github.com/ezzabuzaid/dynamic-component-article/tree/main/src/app) is available to browse through Github. or a [Demo](https://stackblitz.com/edit/angular-ivy-ogmamz?file=src%2Fapp%2Fcolor-box.component.ts) if you prefer.

UPDATE - 5/8/2023
\_The component inspection API has been deprecated as of Angular V13, If you're using Angular v14 and above the you need to [update your implementation.](https://github.com/ezzabuzaid/dynamic-component-article/blob/main/src/app/dynamic-component.directive.v14.ts)

## The Problem

In order to create a dynamic component, you have to use either `ngComponentOutlet` directive or `ComponentFactoryResolver` object, neither provides a way to bind inputs and outputs.

moreover, `ngOnChanges` won't work, [This is because the function that performs inputs checks is generated by the compiler during compilation](https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges).

## The Solution

To work around the problem we would use a custom directive that could help as little as possible to facilitate the bindings.

We will use `ComponentFactoryResolver` to create a component factory that holds metadata about the component inputs and outputs. this metadata will be used to ensure correct properties names of inputs and outputs are used.

```typescript
const factory = componentFactoryResolver.resolveComponentFactory(ComponentType);
```

`factory` has two getters that represent the component inputs and outputs.

```typescript
/**
 * The inputs of the component.
 */
abstract get inputs(): {
    propName: string;
    templateName: string;
}[];
/**
 * The outputs of the component.
 */
abstract get outputs(): {
    propName: string;
    templateName: string;
}[];
```

Each of which has `propName` and `templateName` that corresponds to

```typescript
@Input(templateName) propName;
@Output(templateName) propName;
```

_Note: `templateName` defaults to `propName` if not specifed._

## Setup

Our directive would be used like this

```html
<ng-template [dynamic-component]="component" [inputs]="{}" [outputs]="{}">
</ng-template>
```

**Types that will be used in the code**

```typescript
type UserOutputs = Record<string, (event: any) => void>;
type UserInputs = Record<string, any>;
type ComponentInputs = ComponentFactory<any>['inputs'];
type ComponentOutputs = ComponentFactory<any>['outputs'];
type Color = 'red' | 'blue' | 'green';
```

**Utility function for strict mode people** 😅

```typescript
function assertNotNullOrUndefined<T>(
  value: T
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(`cannot be undefined or null.`);
  }
}
```

**The directive**

```typescript
@Directive({
  selector: '[dynamic-component]',
})
export class DynamicComponentDirective implements OnDestroy, OnChanges {
  @Input('dynamic-component') component!: Type<any>;
  @Input() outputs?: UserOutputs = {};
  @Input() inputs?: UserInputs = {};
  ngOnChanges(changes: SimpleChanges) {}
  ngOnDestroy() {}
}
```

To complete the setup we need to make sure that

1. `outputs`/`inputs` object corresponds to component outputs/inputs, no incorrect names used.
2. `component` `ngOnChange` runs on input change.
3. outputs `EventEmitter` are auto unsubscribed from.

I'll show a few functions implementation to better highlight how things are done. You might want to check the [complete code](https://github.com/ezzabuzaid/dynamic-component-article/blob/main/src/app/dynamic-component.directive.ts) while reading the following section.

## Validation

Since this is not Angular out-of-the-box solution we can't ensure the correct inputs/outputs names are used hence manual validation is required to avoid hidden issues.

As mentioned above `ComponentFactory` object will be used to inspect component inputs and outputs,

### Inputs

Loop over the user-provided inputs, check if each provided input is declared in the component as **Input**.
A component input is a field decorated with `@Input`.

```typescript
private validateInputs(componentInputs: ComponentInputs, userInputs: UserInputs) {
  const userInputsKeys = Object.keys(userInputs);
  userInputsKeys.forEach(userInputKey => {
      const componentHaveThatInput = componentInputs.some(componentInput => componentInput.templateName === userInputKey);
      if (!componentHaveThatInput) {
          throw new Error(`Input ${ userInputKey } is not ${ this.component.name } input.`);
      }
  });
}
```

### Outputs

Loop over the component outputs, check if each output holds an instance of `EventEmitter`.
A component output is a field decorated with `@Output` and has `EventEmitter` instance as value.

In the other part, we perform a loop over the user-provided outputs, check if each provided output is declared in the component as **Output** and if the user-provided output is function. that function will be used as `EventEmitter` handler.

```typescript
private validateOutputs(componentOutputs: ComponentOutputs, userOutputs: UserOutputs, componentInstance: any) {
  componentOutputs.forEach((output) => {
      if (!(componentInstance[output.propName] instanceof EventEmitter)) {
          throw new Error(`Output ${ output.propName } must be a typeof EventEmitter`);
      }
  });

  const outputsKeys = Object.keys(userOutputs);
  outputsKeys.forEach(key => {
      const componentHaveThatOutput = componentOutputs.some(output => output.templateName === key);
      if (!componentHaveThatOutput) {
          throw new Error(`Output ${ key } is not ${ this.component.name } output.`);
      }
      if (!(userOutputs[key] instanceof Function)) {
          throw new Error(`Output ${ key } must be a function`);
      }
  });
}
```

## Binding

Binding is pretty straightforward now since we won't have incorrect inputs/outputs names.

### Inputs

```typescript
private bindInputs(componentInputs: ComponentInputs, userInputs: UserInputs, componentInstance: any) {
  componentInputs.forEach((input) => {
      const inputValue = userInputs[input.templateName];
      componentInstance[input.propName] = inputValue;
  });
}
```

### Outputs

`takeUntil` operator used to unsubscribe from the `EventEmitter` instance later on.
`this.subscription` is an instance of `Subject`, which will be declared in the next sections.

```typescript
private bindOutputs(componentOutputs: ComponentInputs, userOutputs: UserInputs, componentInstance: any) {
  componentOutputs.forEach((output) => {
      (componentInstance[output.propName] as EventEmitter<any>)
          .pipe(takeUntil(this.subscription))
          .subscribe((event) => {
              const handler = userOutputs[output.templateName];
              if (handler) { // in case the output has not been provided at all
                  handler(event);
              }
          });
  });
}
```

## Creating The Component

Creating dynamic components is done using `ComponentFactoryResolver` and `ViewContainerRef`.
First, we create a factory using `ComponentFactoryResolver`, the factory contains the metadata to perform inputs/outputs validation.

Second, we use that factory to create the component using `ViewContainerRef`, it also takes the injector, which will be declared later on.

```typescript
private createComponent() {
  this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
  this.componentRef = this.viewContainerRef.createComponent<any>(this.componentFactory, 0, this.injector);
}
```

## Cleaning up

To destroy a component we invoke the `destroy` method defined in `ComponentRef`, then we clear `ViewContainerRef` which holds the actual component, doing so will also remove it from the UI.

```typescript
private destroyComponent() {
  this.componentRef?.destroy();
  this.viewContainerRef.clear();
}
```

the cleanup will be performed in `ngOnDestroy` lifecycle, the `subscription` is as mentioned previously an instance of `Subject` that we used to unsubscribe from `EventEmitter` subscriptions.

```typescript
ngOnDestroy(): void {
  this.destroyComponent();
  this.subscription.next();
  this.subscription.complete();
}
```

## Combine The Functions

Let's call the functions, `ngOnChanges` lifecycle will be used to create the component whenever the `component` input or `injector` input changes, in that case, we destroy the previous component first, then we create the new component.

after that, we perform the validation then bind the inputs and outputs.

```typescript
private subscription = new Subject();
@Input('dynamic-component') component!: Type<any>;
@Input() outputs?: UserOutputs = {};
@Input() inputs?: UserInputs = {};
@Input() injector?: Injector;

ngOnChanges(changes: SimpleChanges): void {
  // ensure component is defined
  assertNotNullOrUndefined(this.component);

  const shouldCreateNewComponent =
      changes.component?.previousValue !== changes.component?.currentValue
      ||
      changes.injector?.previousValue !== changes.injector?.currentValue;

  if (shouldCreateNewComponent) {
      this.destroyComponent();
      this.createComponent();
  }

  // to make eslint happy ^^
  assertNotNullOrUndefined(this.componentFactory);
  assertNotNullOrUndefined(this.componentRef);

  this.subscription.next(); // to remove old subscription
  this.validateOutputs(this.componentFactory.outputs, this.outputs ?? {}, this.componentRef.instance);
  this.validateInputs(this.componentFactory.inputs, this.inputs ?? {});
  this.bindInputs(this.componentFactory.inputs, this.inputs ?? {}, this.componentRef.instance);
  this.bindOutputs(this.componentFactory.outputs, this.outputs ?? {}, this.componentRef.instance);
}
```

with that, in place, we have all the required functionality to do what [ngComponentOutlet] can't.

## The ngOnChanges

So far we can completely create dynamic components, but we can't use `ngOnChanges` lifecycle since it doesn't react to `@Input` changes therefore we have to do this manually.

Another way to do this is to change the `@Input` field that concerned you to have getter and setter, so you can know when a change happens, but it is not a favorable option so let's stick with `ngOnChanges`.

Let's start with creating _changes_ object for the component.
Basically, do a loop over new inputs (`currentInputs`) and compare each input with the previous one, in case of change we add it as changed input to the changes object

```typescript
private makeComponentChanges(inputsChange: SimpleChange, firstChange: boolean): Record<string, SimpleChange> {
  const previuosInputs = inputsChange?.previousValue ?? {};
  const currentInputs = inputsChange?.currentValue ?? {};
  return Object.keys(currentInputs).reduce((changes, inputName) => {
  const currentInputValue = currentInputs[inputName];
  const previuosInputValue = previuosInputs[inputName];
  if (currentInputValue !== previuosInputValue) {
      changes[inputName] = new SimpleChange(firstChange ? undefined : previuosInputValue, currentInputValue, firstChange);
  }
  return changes;
  }, {} as Record<string, SimpleChange>);
}
```

Now, we have to manually call the `ngOnChanges` from the component instance if the component declared it and passes changes as an argument.

Let's modify directive `ngOnChanges` to have the functionality

```typescript
ngOnChanges(changes: SimpleChanges): void {
    // ensure component is defined
  assertNotNullOrUndefined(this.component);

  let componentChanges: Record<string, SimpleChange>;
  const shouldCreateNewComponent =
      changes.component?.previousValue !== changes.component?.currentValue
      ||
      changes.injector?.previousValue !== changes.injector?.currentValue;

  if (shouldCreateNewComponent) {
      this.destroyComponent();
      this.createComponent();
      // (1)
      componentChanges = this.makeComponentChanges(changes.inputs, true);
  }
  // (2)
  componentChanges ??= this.makeComponentChanges(changes.inputs, false);

  assertNotNullOrUndefined(this.componentFactory);
  assertNotNullOrUndefined(this.componentRef);

  this.validateOutputs(this.componentFactory.outputs, this.outputs ?? {}, this.componentRef.instance);
  this.validateInputs(this.componentFactory.inputs, this.inputs ?? {});

  // (3)
  if (changes.inputs) {
      this.bindInputs(this.componentFactory.inputs, this.inputs ?? {}, this.componentRef.instance);
  }

  // (4)
  if (changes.outputs) {
      this.subscription.next(); // to remove old subscription
      this.bindOutputs(this.componentFactory.outputs, this.outputs ?? {}, this.componentRef.instance);
  }

  // (5)
  if ((this.componentRef.instance as OnChanges).ngOnChanges) {
      this.componentRef.instance.ngOnChanges(componentChanges);
  }
}
```

1. Create changes object with `firstChange` as true after creating the component.
2. In case the component didn't change that means only the inputs or outputs did change so we create changes object with `firstChange` as false.
3. Rebind the inputs only if they did change.
4. Rebind the outputs only if they did change.
5. Calling component `ngOnChanges` lifecycle with the possible inputs changes.

## Example

Time to try it out. [Demo](https://stackblitz.com/edit/angular-ivy-ogmamz?file=src%2Fapp%2Fcolor-box.component.ts)

Here's a simple component that displays a color based on input and emits an event when it changes.

```typescript
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-color-box',
  template: `<div
    style="height: 250px; width: 250px;"
    [style.background-color]="backgroundColor"
  ></div>`,
})
export class ColorBoxComponent implements OnChanges {
  @Input() backgroundColor: Color = 'red';
  @Output() backgroundColorChanges = new EventEmitter<Color>();

  ngOnChanges(changes: SimpleChanges): void {
    this.backgroundColorChanges.next(changes.backgroundColor);
  }
}
```

Host component declares `<ng-template>` with `ColorBoxComponent` as the `dynamic-component` with inputs and outputs.
Clicking on _Change Color_ button will invoke `ngOnChanges` of `ColorBoxComponent`, just as it should be.

Try to change the input name and you'll see an exception thrown in the console.

A bit about outputs, you'll need to use an arrow function syntax to have `this` referring to the `AppComponent` instance.

```typescript
import { Component } from '@angular/core';
import { ColorBoxComponent } from './color-box.component';

@Component({
  selector: 'app-root',
  template: `
    <ng-template
      [dynamic-component]="component"
      [inputs]="{ backgroundColor: backgroundColor }"
      [outputs]="{ backgroundColorChanges: onColorChange }"
    >
    </ng-template>
    <button (click)="changeColor()">Change Color</button>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  component = ColorBoxComponent;
  backgroundColor: Color = 'green';

  onColorChange = (value: Color) => {
    console.log(value, this.backgroundColor);
  };

  changeColor() {
    this.backgroundColor = 'blue';
  }
}
```

## Conclusion

Dynamic component is almost required in every project and having the ability to deal with it in an easy way is important.

Lastly, there's already a package that does all of that and a bit more [ng-dynamic-component](https://www.npmjs.com/package/ng-dynamic-component).

### Resources

1. [Here is what you need to know about dynamic components in Angular](https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges)
2. [NgComponentOutlet](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_component_outlet.ts)
3. [Dynamically Creating Components with Angular](https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d).

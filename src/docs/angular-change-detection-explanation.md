# Angular Change Detection and Object References

When you bind an object directly to a property in Angular, like this:

```typescript
public messageClasses = {
  'text-success': !this.success,
  'text-success2': !this.success2,
  'text-danger': this.hasError
};
```

And use it in the template like this:

```html
<p [ngClass]="messageClasses">{{ name }}</p>
```

Angular's change detection mechanism doesn't work as you might expect. Here's why:

1. **Object Reference**: Angular's change detection for objects (including arrays) works by checking if the object reference has changed, not by doing a deep comparison of the object's properties.

2. **Initial Binding**: When you first bind `messageClasses`, Angular sets up the initial classes based on the object's current state.

3. **Subsequent Changes**: When you later change `success`, `success2`, or `hasError`, the properties that `messageClasses` depends on change, but the `messageClasses` object itself (its reference) doesn't change.

4. **No Trigger for Re-evaluation**: Because the object reference hasn't changed, Angular doesn't know it needs to re-evaluate the classes. It still sees the same object reference it saw before.

5. **Manual Intervention Required**: To make it work with a property, you would need to manually create a new object each time one of the dependent properties changes, like this:

   ```typescript
   updateMessageClasses() {
     this.messageClasses = {
       'text-success': !this.success,
       'text-success2': !this.success2,
       'text-danger': this.hasError
     };
   }
   ```

   And call this method whenever `success`, `success2`, or `hasError` changes.

This is why using a getter or a method is often preferred for dynamic class bindings - it ensures that the object is recreated (with a new reference) every time it's accessed, reflecting the current state of the component.

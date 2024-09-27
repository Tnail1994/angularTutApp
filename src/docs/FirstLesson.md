# Allgemein wichtige Informationen
- Eine Komponente besteht aus .ts (TypeScript), .css (Cascading Style Sheets) und .html (Hypertext Markup Language) Code Weitere Erklärungen zu Styles und css [More about](imgs/html-css-javascript-differences.png)

- Es werden lediglich strings gebunden (Only string bindings)

# Eine Komponente erstellen

```
ng g c <Name>
```

`<Name>` ist hier der gewünschte Name der Komponente ohne Klammern

# Bindings mit verschiedene "Fallklassen"

- Eine Komponente, welche ein Property mit Key und Values besitzt
- Jeder Key definiert eine Class (welche für Style-Binding benutzt werden kann)
- Der Value, also die Condition, gibt an, ob dieser Style angewendet werden soll. Der letzte Style überschreibt den vorherhigen, heißt z.B. Background-Color wird bei Eintrag 1 und 2 gesetzt und beide sind true, dann wird die Farbe laut Eintrag 2 gesetzt.


```ts
    export class TestComponent {
        public name = "stefans web";
        public success = true;
        public success2 = true;
        public hasError = true;

        public messageClasses = {
            'text-success': this.success,
            'text-success2': this.success2,
            'text-danger': this.hasError
        }
    }
```


Die Verknüpfung der Komponente geschieht wie folgt:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
```

- Wichtig ist `CommonModule` zu importieren
- Es ist auch möglich, mehrere Styles durch `'[./test.component.css, ]'` hinzuzufügen
       
Die Styles sehen wie folgt aus:

```css
.text-success {
    background-color: #444242;
  }

.text-success2 {
    color: green;
  }

  
.text-danger {
    color: red;
    font-style: italic;
  }
```

- `.<class>` definiert Klasse, welche einen Style definiert **(Class Selector)**
- `p {/* styles for all <p> elements */}` definiert für alle `<p>` (hier im Beispiel) den Style **(Element Selector)**
- `#my-id {  /* styles for the element with id="my-id" */}` definiert den Style für das Element mit der Id **(Id Selector)**
- `[type="text"] {  /* styles for elements with type="text" */}` definiert den Style für alle Element mit den Attribut **(Attribute Selector)**

Weitere Erklärungen zu Styles und css [More about Styles inside css](css-basics-explanation.md)


Der Import von `CommonModule` ist für das Binding im HTML-Code wichtig:

```html
<p [ngClass]="messageClasses">{{ name }}</p>
```

- Fallklassen-Binding durch `[ngClass]`
- Style ändert sich, anhand der verschiedenen wahren Fälle
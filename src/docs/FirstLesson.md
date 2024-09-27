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
___________________
**Fehler**

Das Binding durch das Property `messageClasses` funktioniert nicht, da das Objekt selbst, sondern nur der Inhalt, verändert hat. Die Lösung wäre eine Getter-Methode, welche im Change-Detection-Cycle ein neues Objekt erstellt.

```ts   
  get messageClasses() {
    return {
      'text-success': this.success,
      'text-success2': this.success2,
      'text-danger': this.hasError
    };
  }
```

[Talking with Claude](angular-change-detection-explanation.md) (https://claude.ai/chat/9e68e9f7-3eba-423c-931e-f9c77b60de1e )


**Ist dies die Standard-Vorgehensweise?**

Ich habe mir die Frage gestellt, ob dies wirklich der Way to go ist. Jedes mal in der Update-Loop wird ein neues Objekt erstellt. Wird dies sehr oft verwendet, kann ich mir vorstellen, dass dies zu Performance-Problemen gibt.

Todo: Hier auf jeden Fall noch recherieren.

[First infos via clause](angular-performance-optimization.md) 
___________________


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

==> Styles abhängig von verschiedenen Conditions machen

# Weiteres zu Binding Styles 

Man kann Styles auch in TypeScript definieren und sich daran binden. Wichtig ist hier ebenfalls der Import `CommonModule` aus vorherigen Kapitel.

```ts
  public someStyles = {
    fontStyle: "italic",
    color: "blue"
  }
```

```html
<p [ngStyle]="someStyles">Some styling</p>
```

==> Mehrere Styles gleichzeitig definieren und bindable

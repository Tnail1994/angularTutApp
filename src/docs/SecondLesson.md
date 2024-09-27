# Interaktionen und Event Binding

Wird die Webseite erweitert durch Controls, welche den User Aktionen durchführen lassen, dann
- wird durch Event-Binding Methoden and verschiedestene Events gebunden:
  
  Im Control `<button>` wird das Click-Event an `onClickClicker` Methode gebunden
  ```html
  <p>
    <button (click)="onClickClicker($event)">clicker</button>
  </p>
  ```
  - Alle Events unter `()`
  - `$event` Input-Parameter gibt alle Informationen über das ausgeführte Event

  In der Komponente definierte `onClickClicker` Methode
  ```ts
  onClickClicker(event: any){
    console.log(event);
  }
  ```

- um Referenzen in Methode überzugeben muss einem Element eine Id vergeben werden, welche im html code referenziert wird:
   ```html
  <p>
    <input #inputField type="number">
    <button mat-fab extended>
      <mat-icon>home</mat-icon>
      Home
    </button>
  </p>
  ```

 

# *ngIf and so

- Vorsicht syntax: `*ngif="...;...;"`, alles innterhalb der Anführungszeichen
- In html
  ```html  
  <div *ngIf="success2">
      <p>The content is visible because the condition is true.</p>
  </div>

  <div *ngIf="success; then hiddenBlock; else endBlock">
  </div>

  <ng-template #hiddenBlock>
      <h2>You found a sected block!</h2>
  </ng-template>

  <ng-template #endBlock>
      <h2>Ending</h2>
  </ng-template>
  ```

Durch `ngif`, `ngswitch` und `ngfor` kann man unterschiedliche und oder mehrere Elemente, abhängig einer Condition, anzeigen lassen.
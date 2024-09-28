# Erweitertung DI, Services usw

## Einen Service erstellen

```
    ng g s <Name>
```

## Einen Service in den Container registrieren

```ts 
@Injectable({
  providedIn: 'root'
})
export class Service {}

```

## HttpClient im Projekt verwenden
Importiere `import { provideHttpClient, withFetch } from '@angular/common/http';` und füge zu providern hinzu: `provideHttpClient(withFetch())]`

## Observables

Daten die von einem Service kommen. Welche für gewöhnlich über einen HTTP-Request kommen, werden in `Observable`s gespeichert.
Hier gibt es mehrere Möglichkeiten an die Daten zu gelangen:
1) Subscribe
2) Streams

Wir betrachten erstmal Möglichkeit 2, da dies anscheinend der Way to go ist.

Hier todo: Verstehe mit der Möglichkeit 1 Subscribe.

- Injeziere den HttpClient in den Service

  ```ts
    constructor(private http: HttpClient) { }
  ```
- Request der Daten 
  ```ts
    constructor(private http: HttpClient) { }

    getEmployees(): Observable<IEmployee[]>{
      return this.http.get<IEmployee[]>(this._url);
    }
  ```
- Die Komponente die einen Stream mit Daten anzeigen soll. Erstellung eines Properties
  ```ts
    employees$: Observable<IEmployee[]> = new Observable;
  ```
- Anfordern der Daten durch Service
  ```ts
    this.employees$ = this._employeeService.getEmployees();
  ```
- Das `$` gibt an, dass es sich um einen Stream handelt
- Ist ein Property ein Stream, dann muss eine Async-Pipe verwendet werden
  ```html
  <div *ngFor="let employee of employees$ | async">
    <p>{{employee.age}} {{employee.name}}</p>
  </div>
  ```
- Hinweis: Employee ist ein Interface:
  ```ts
    export interface IEmployee {
      id: number;
      name: string;
      age: number;
  }  
  ``` 



## HttpClient mit lokalen JSON Daten mocken
- Json File erstellen z.B. unter src/assets/data
- Im angular.json- File unter projects > your-project-name > architect > build > options die Konfiguration checken
  ```
   "assets": [
              {
                "glob": "**/*",
                "input": "public"                
              },
              "src/assets"
  ```
- Der Ordner `"src/assets"` muss in der `assets` Konfiguration mit angegeben werden. (Die ordner, wo gemockte lokale JSON-Daten liegen). (Normalerweise werden Daten über eine API abgerufen)


## Errorhandling von HTTP-Requests
Für Streams muss zweimal die "pipe" implementiert werden?
D.h. im Service handle ich den Fehler und gebe ihn "nach oben" weiter
```ts
 getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url).pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }  
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
```

Die Komponente, die dann den Response absetzt muss ebenfalls auf den Fehler reagieren um ggfs. dem User anzuzeigen, dass ein Fehler aufgetreten ist
```ts
 this.employees$ = this._employeeService.getEmployees().pipe(
      tap({
        next: () => this.errorMsg = '',
        error: (error) => {
          this.errorMsg = error.message;
          this.hasError = true;
        }
      }),
      catchError(() => of([]))  // Return an empty array on error
    );
```
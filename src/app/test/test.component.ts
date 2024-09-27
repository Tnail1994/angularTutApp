import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})

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

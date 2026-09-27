import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private https = inject(HttpClient);
  protected  title = 'Dating App';

  protected members = signal<any>([]);

  ngOnInit(): void {
    this.https.get('https://localhost:5001/api/members').subscribe({
      next: response=> this.members.set(response),
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  
  async getMembers() {
    try {
      const response = await this.https.get('https://localhost:5001/api/members').toPromise();
      this.members.set(response);
    } catch (error) {
      console.error(error);
    }
  }
}

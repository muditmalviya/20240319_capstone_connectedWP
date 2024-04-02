import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { RouterLink } from '@angular/router'; // Not required as it's used within templates directly
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute is imported but not used
import { FormsModule } from '@angular/forms'; // Importing FormsModule for ngModel, etc.

@Component({
  selector: 'app-history-operator',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule, RouterLink, FormsModule], // Importing required modules
  templateUrl: './history-operator.component.html', // Template URL for HTML file
  styleUrl: './history-operator.component.css' // Style URL for CSS file
})
export class HistoryOperatorComponent implements OnInit {
  historys: any[] = []; // Array to store issue history

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // ActivatedRoute is imported but not used
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData(); // Fetch issue history when component initializes
  }

  fetchData() {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

      // Fetch issue history from API
      this.http.get<any[]>('http://localhost:3000/api/issues', { headers: headers })
        .subscribe(
          (response) => {
            this.historys = response; // Assign fetched history to the component's historys array
          },
          (error) => {
            console.error('Error fetching data:', error); // Log error if fetching data fails
          }
        );
    } else {
      console.error('No token provided'); // Log error if no token is found in local storage
    }
  }
}

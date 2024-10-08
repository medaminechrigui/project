import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputText: string = ''; // Bind this to the input field
  displayedText: string = ''; // Variable to store the displayed text
  messagesTable: { text: string, color?: string }[] = []; // Array of objects for storing messages and colors
  useRandomColors: boolean = false; // Flag to switch between random and ordered colors
  sortOrder: 'asc' | 'desc' | 'random' = 'asc'; // New property to track sorting order

  // Method to add the input text to the messages table
  ajout() {
    if (this.inputText) {
      // Add the input text as an object to the messages table (array)
      this.messagesTable.push({ text: this.inputText });
      this.inputText = ''; // Clear the input after adding
      this.sortMessages(); // Sort the messages after adding a new one
    }
  }

  // Method to delete the last element from the messages table
  sup() {
    this.messagesTable.pop(); // Remove the last element from the array
    this.sortMessages(); // Sort the messages after removing one
  }

  // Method to get the color based on the index (red, green, blue rotation)
  getTextColor(index: number): string {
    // If random colors are enabled, return the color or a default
    if (this.useRandomColors) {
      return this.messagesTable[index]?.color || 'black'; // Use 'black' if color is undefined
    }

    // Return ordered colors
    const colors = ['red', 'green', 'blue'];
    return colors[index % colors.length]; // Return ordered colors otherwise
  }

  // Method to generate a random color
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Method to toggle between random and ordered colors
  random() {
    this.useRandomColors = !this.useRandomColors; // Toggle between random and ordered colors

    if (this.useRandomColors) {
      // Apply random colors if in random mode
      this.messagesTable.forEach((message, index) => {
        this.messagesTable[index].color = this.getRandomColor(); // Assign a random color
      });
    } else {
      // Clear colors when switching back to ordered mode
      this.messagesTable.forEach((message, index) => {
        delete message.color; // Remove the color property for ordered mode
      });
    }
  }

  // Method to toggle sorting order
  toggleSortOrder() {
    if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else if (this.sortOrder === 'desc') {
      this.sortOrder = 'random';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortMessages(); // Sort the messages according to the new order
  }

  // Method to sort messages based on the current sort order
  sortMessages() {
    if (this.sortOrder === 'asc') {
      this.messagesTable.sort((a, b) => a.text.localeCompare(b.text));
    } else if (this.sortOrder === 'desc') {
      this.messagesTable.sort((a, b) => b.text.localeCompare(a.text));
    } else if (this.sortOrder === 'random') {
      this.messagesTable.sort(() => Math.random() - 0.5);
    }
  }
  getButtonText(): string {
    return this.useRandomColors ? 'cyclic' : 'random'; // Return 'cyclic' if in random state, otherwise 'random'
  }
}

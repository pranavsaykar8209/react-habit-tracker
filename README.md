# React Habit Tracker

A minimalist, aesthetically pleasing 12-month habit tracker built with React. Track your daily habits over an entire year with an Apple-style interface, smooth animations, and a gorgeous dark mode design.

## Features

- **12-Month Calendar View**: A clear, bird's-eye view of your year with a 4x3 grid layout.
- **Color-Coded Days**:
  - 🟢 **Green (Glowing)**: Completed on that day.
  - 🔴 **Red (Glowing)**: Missed (past days automatically mark as missed if not completed).
  - ⚫ **Dark Grey**: Future days yet to come.
- **Interactive Toggles**: Click any dot to toggle its completion status.
- **Day Tooltips**: Hover over any day's circle to instantly see the day number.
- **Data Persistence (JSON)**: Easily export your progress as a `progress.json` file and import it anytime to keep your data safe.
- **High-Res Export**: Turn your yearly progress graph into a custom 4K desktop wallpaper with a single click ("Export Wallpaper").
- **Quick Actions**: Handy buttons to quickly "Mark Today Complete" or "Reset Today".

## Tech Stack

- **React**: Functional components and Hooks (`useState`, `useRef`).
- **Vanilla CSS**: Grid layouts and smooth transition animations with custom pseudo-elements for tooltips.
- **html2canvas**: Used to generate the 4K wallpaper exports.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download this repository.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd react-habbit-tracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm start
```

The app will compile and open automatically in your default browser at `http://localhost:3000`.

## Usage

1. **Marking a Habit**: Click on a circle corresponding to a specific day to toggle the habit's status to "Completed".
2. **Checking the Date**: Hover over any dot to see which day of the month it represents.
3. **Saving Progress**: Click the **Export JSON** button to download your current state to your computer.
4. **Loading Progress**: Click **Import JSON** and select your saved progress file to restore your track record.
5. **Making a Wallpaper**: Click **Export Wallpaper** to download a beautifully rendered `<year>.png` of your habit calendar. 

## Customization

You can customize the base year in `src/App.js` by editing the `year` const. The UI and colors can be easily modified in `src/styles.css`.

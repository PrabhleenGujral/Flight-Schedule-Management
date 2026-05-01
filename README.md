# Flight Schedule Manager

A modern React-based internal tool for managing and visualizing flight schedules. Built for TelePort's Senior React Developer Take-Home Assessment.

---

## ✈️ Features

- **Virtualized Table**: Handles 200+ flight records smoothly using `react-window`.
- **Inline Editing**: Edit date, time, and status directly in the table with Save/Cancel, async simulation, and error handling.
- **Status Toggle**: Instantly toggle flight status (Active/Inactive) with a switch.
- **Bulk & Single Delete**: Select and delete one or multiple flights at once.
- **Comprehensive Filters**: Filter by date range, days of operation, status, AOC, and body type. All filters combine with AND logic.
- **Search**: Search by flight number, origin, or destination—works with all filters.
- **Responsive Design**: Clean, modern UI with dark mode and mobile-friendly layout.
- **Local State Only**: All data operations are performed client-side; no backend required.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/flight-schedule-manager.git
cd flight-schedule-manager
npm install
# or
yarn install
```

### Running the App

```bash
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Project Structure

```
flight-schedule-manager/
├── public/
├── src/
│   ├── components/
│   │   └── FlightTable.js
│   │   └── FlightTable.css
│   ├── data/
│   │   └── flights.json
│   ├── App.js
│   └── index.js
└── package.json
```

---

## 📝 Assignment Coverage

- [x] Virtualized table with `react-window`
- [x] Inline editing with async save/cancel/error
- [x] Status toggle (Active/Inactive)
- [x] Single & bulk delete
- [x] Filters: date range, days, status, AOC, body type (AND logic)
- [x] Search (flight number, origin, destination)
- [x] Clear all filters
- [x] All data handled in local state

---

## 📦 Dependencies

- React
- react-window
- Material UI library

---

## 🛠️ Customization

- Update `src/data/flights.json` to change the dataset.
- Tweak styles in `FlightTable.css` for a different look.

---

## 📄 License

MIT

---

## 👤 Author

- [Prabhleen Kaur Gujral](https://github.com/prabhleenGujral)

---

## 💬 Feedback

PRs and issues welcome!

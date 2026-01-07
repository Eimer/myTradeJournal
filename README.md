<<<<<<< HEAD
# 🚀 Trading App

Modern Trading Platform built with **Angular 19** and **Supabase**.
=======
# 🚀 Trading App "Trade journal"

Modern Trading Platform built with **Angular 21** and **Supabase**.
>>>>>>> 84723dceb4ca96ac83ebff6e72ebc7ae7cce23d2

---

### ⚠️ Project Status: Under Development
**Current Phase:** Implementation of core authentication and user state management. 
The project is being actively developed; some features might be incomplete or subject to change.

---

## 🛠 Tech Stack

<<<<<<< HEAD
* **Frontend:** Angular 19 (Standalone Components)
=======
* **Frontend:** Angular 21 (Standalone Components)
>>>>>>> 84723dceb4ca96ac83ebff6e72ebc7ae7cce23d2
* **Backend:** [Supabase](https://supabase.com/) (Auth, Database, Edge Functions)
* **State Management:** RxJS (Reactive programming with BehaviorSubjects)
* **Styling:** SCSS
* **API:** REST via Angular HttpClient

---

## 🏗 Architecture & Logic

The application is built using a **Clean Service Architecture**:

* **ApiService:** Handles raw HTTP communication with Supabase Auth API.
* **UserService:** Manages the global state of the user (`loggedIn`, `loggedOut`, `waitAuth`) and stores user data.
* **AuthService:** Coordinates business logic like login, registration, and logout flows.
* **AuthGuard:** A robust protection layer that handles session recovery and smart redirection via `returnUrl`.

---

## ✅ Implemented Features

- [x] **Secure Sign Up:** User registration with metadata (DisplayName).
- [x] **JWT Authentication:** Login flow with `access_token` and `refresh_token` storage.
- [x] **Session Persistence:** App automatically recovers user session from `localStorage` on page reload.
- [x] **Reactive Auth State:** Components react instantly to login/logout events.
- [x] **Route Protection:** Unauthorized users are redirected to login with a saved return path.

---

## 🚀 Getting Started

### Prerequisites
* Node.js & npm
* Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Eimer/myTradeJournal.git

### How to Run locally
- Install packages:
  ```bash
  npm install
- Use:
  ```bash
  ng serve --open

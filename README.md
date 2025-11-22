# Aviation Portal - Developer Installation Guide

This guide provides step-by-step instructions to set up the Aviation Licensing Portal for local development. The project consists of a **Laravel 11** backend and a **React + Vite** frontend.

## Prerequisites

Ensure you have the following installed on your machine:

-   **PHP** (>= 8.2)
-   **Composer** (Dependency Manager for PHP)
-   **Node.js** (>= 18) & **npm**
-   **Database** (MySQL, PostgreSQL, or SQLite)

---

## 1. Backend Setup (Laravel)

1.  **Navigate to the project directory:**
    ```bash
    cd aviation-portal
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Environment Configuration:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    -   Open `.env` and configure your database settings. For example, if using SQLite (simplest for dev):
        ```ini
        DB_CONNECTION=sqlite
        # DB_HOST, DB_PORT, etc. can be removed or ignored for sqlite
        ```
    -   If using SQLite, create the database file:
        ```bash
        # Windows (PowerShell)
        New-Item -ItemType File database/database.sqlite
        # Linux/Mac
        touch database/database.sqlite
        ```

4.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

5.  **Run Migrations:**
    Create the necessary database tables:
    ```bash
    php artisan migrate
    ```

6.  **Start the Backend Server:**
    ```bash
    php artisan serve
    ```
    The API will be available at `http://127.0.0.1:8000`.

---

## 2. Frontend Setup (React + Vite)

1.  **Open a new terminal** (keep the backend running).

2.  **Install Node dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## 3. Project Structure

-   **Backend (`/app`, `/routes`, `/database`)**: Handles API requests, database interactions, and business logic.
    -   `routes/api.php`: API route definitions.
    -   `app/Http/Controllers/ApplicationController.php`: Main controller for license applications.
-   **Frontend (`/src`)**: React application.
    -   `src/app.jsx`: Main entry point and routing.
    -   `src/pages/`: Page components (Dashboard, ApplicationForm, etc.).
    -   `src/components/`: Reusable UI components (Layout, etc.).

## 4. Common Troubleshooting

### API Connection Issues
-   **Problem**: Frontend says "Failed to fetch" or shows network errors.
-   **Solution**: Ensure the Laravel server is running on port `8000`. The Vite config (`vite.config.js`) is set up to proxy `/api` requests to `http://127.0.0.1:8000`.

### Database Errors
-   **Problem**: "SQLSTATE[HY000] [2002] Connection refused"
-   **Solution**: Verify your `.env` database credentials. If using MySQL, ensure the service is running. If using SQLite, ensure the absolute path in `DB_DATABASE` is correct (or just use `database/database.sqlite` if configured properly).

### Missing Styles
-   **Problem**: Tailwind classes not applying.
-   **Solution**: Ensure `npm run dev` is running, as it compiles the CSS on the fly.

---

## 5. Development Workflow

1.  Start Backend: `php artisan serve`
2.  Start Frontend: `npm run dev`
3.  Access App: `http://localhost:5173`

Happy Coding! ✈️

# Task Manager App

A React + Vite task management application built with Redux for state management. It allows users to:

- View a list of tasks in a sortable table
- Add new tasks
- Edit existing tasks
- Delete tasks
- View task details
- Track task status, priority, and date information

This project uses a simulated data source and loads initial task data from a public API before allowing local task interaction in the UI.

## Features

- Responsive task dashboard
- Sortable task table
- Task detail view
- Add/edit task form
- Status and priority tracking
- Local Redux-based state flow

## Tech Stack

- React
- Vite
- Redux Toolkit
- React Redux

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js 18 or later
- npm or yarn

## Run Locally

1. Open a terminal in the project root.
2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

4. Open the local URL shown in the terminal (typically http://localhost:5173).

## Production Build

To create a production build:

npm run build

To preview the production build locally:

npm run preview

## Project Scripts

- npm run dev — starts the Vite dev server
- npm run build — builds the project for production
- npm run preview — previews the production build
- npm run lint — runs ESLint checks

## Folder Overview

- src/App.jsx — main application logic and UI flow
- src/components — reusable task-related UI components
- src/features — Redux actions and reducer logic
- src/app/store.js — Redux store setup

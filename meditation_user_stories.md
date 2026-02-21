# Mindful Moments – User Stories & Acceptance Criteria

## User Authentication (Register & Login)

- **User Story 1 – Registration**:
  As a user, I want to register by entering my username, email, and password, so that I can create an account.

  **Acceptance Criteria**:
  - Users can enter valid details and click “Sign Up” to create an account.
  - An error message is shown if any input is invalid or missing.

- **User Story 2 – Login**:
  As a user, I want to log in using my email and password, so that I can access my account.

  **Acceptance Criteria**:
  - Users can log in with correct credentials and are redirected to their dashboard.
  - An error message is displayed for incorrect credentials.

- **User Story 3 – Input Validation Feedback**:
  As a user, I want to receive feedback when I attempt to sign up or log in without entering details, so that I can fix the errors.

  **Acceptance Criteria**:
  - Error messages are displayed for missing fields on sign-up or login attempts.

- **User Story 4 – Local Storage Persistence**:
  As a user, I want my details to be stored in local storage, so that my data persists between sessions.

  **Acceptance Criteria**:
  - User details are saved in local storage after registration.
  - Stored details are used for authentication during login.

---

## Homepage Features

- **User Story 5 – Personalized Greeting**:
  As a user, I want a personalized greeting with my name and a title, so that I feel welcomed and encouraged to meditate.

  **Acceptance Criteria**:
  - Display “Hello, [username]”.
  - Display the title “Find your perfect meditation.”

- **User Story 6 – Popular Meditation Cards**:
  As a user, I want to see popular meditation cards, so that I can explore options based on my preferences.

  **Acceptance Criteria**:
  - Display cards with images, titles, descriptions.
  - Show categories such as Calmness and Relaxation.
  - Show durations such as 10 or 15 minutes.

- **User Story 7 – Daily Featured Meditation**:
  As a user, I want a daily featured meditation, so that I can quickly access a recommended session.

  **Acceptance Criteria**:
  - Showcase one meditation with image, title, category, and duration.

- **User Story 8 – Navigation Icons**:
  As a user, I want intuitive navigation icons, so that I can easily move around the app.

  **Acceptance Criteria**:
  - Display a logo in the top-left corner.
  - Display a settings icon in the top-right corner.

---

## Detailed Exercise Screen

- **User Story 9 – About Section**:
  As a user, I want an “About” section for each exercise, so that I can understand its benefits and purpose.

  **Acceptance Criteria**:
  - Display a brief description explaining its focus and stress-reducing benefits.

- **User Story 10 – Instructions Section**:
  As a user, I want an “Instructions” section for each exercise, so that I can perform it correctly.

  **Acceptance Criteria**:
  - Provide step-by-step guidance on posture and breathing techniques.

- **User Story 11 – Add to Favorites Button**:
  As a user, I want an “Add to Favorites” button, so that I can easily save an exercise for future practice.

  **Acceptance Criteria**:
  - Include a visible “Add to Favorites” button at the bottom of the page.

- **User Story 12 – Share and Back Navigation**:
  As a user, I want navigation icons for sharing and going back, so that I can manage the exercise page easily.

  **Acceptance Criteria**:
  - Display a back icon.
  - Display a share icon at the top of the page.

---

## Favorites Functionality

- **User Story 13 – Add to Favorites**:
  As a user, I want to add an item to my Favorites, so that I can save activities for quick access later.

  **Acceptance Criteria**:
  - Show a heart icon with “Add to Favorites”.
  - Outlined heart indicates not saved.
  - Tapping changes to filled heart and “Remove from Favorites”.

- **User Story 14 – Remove from Favorites**:
  As a user, I want to remove an item from Favorites, so that I can manage saved content.

  **Acceptance Criteria**:
  - Show filled heart with “Remove from Favorites”.
  - Tapping removes item and reverts icon.

- **User Story 15 – My Favorites Screen**:
  As a user, I want a “My Favorites” screen, so that I can view all saved items in one place.

  **Acceptance Criteria**:
  - Display list with title, category, duration.
  - Users can tap to view details.
  - Organized layout for easy browsing.

---

## Daily Reminders

- **User Story 16 – Calendar Navigation**:
  As a user, I want to view the calendar and navigate between months, so that I can select reminder dates easily.

  **Acceptance Criteria**:
  - Display current month.
  - Provide navigation arrows for month switching.

- **User Story 17 – Select Date and Time**:
  As a user, I want to select a date and time for a reminder.

  **Acceptance Criteria**:
  - Show default “Selected Date: None”.
  - Show default time (e.g., 20:44).
  - Allow user to select specific date and time.

- **User Story 18 – Add Reminder**:
  As a user, I want to add a reminder after selecting time.

  **Acceptance Criteria**:
  - “Add Reminder” button schedules reminder.

- **User Story 19 – View and Delete Reminders**:
  As a user, I want to see and manage my reminders.

  **Acceptance Criteria**:
  - Display list of reminders with date and time.
  - Provide red “Delete” button.

---

## Sharing Exercises

- **User Story 20 – Share Exercises**:
  As a user, I want to share recommended exercises with others.

  **Acceptance Criteria**:
  - Provide visible share button.
  - Allow sharing via social media, email, or messaging apps.

---

## Logout Functionality

- **User Story 21 – Logout**:
  As a user, I want a clear logout button, so that I can securely log out.

  **Acceptance Criteria**:
  - Display visible “Logout” button.
  - Redirect to login page after logout.
  - Clear user session data.

---

## Settings – Theme Customization

- **User Story 22 – Light/Dark Mode**:
  As a user, I want to switch between light and dark themes.

  **Acceptance Criteria**:
  - Provide theme toggle in settings.
  - Switch themes instantly.
  - No app restart required.

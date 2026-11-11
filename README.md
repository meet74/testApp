# TicktEase

TicktEase is a React Native (Expo) event discovery and ticket booking app. Users browse events by city, book tickets, pay with a Stripe card, and manage their bookings — all backed by Firebase.

## Tech Stack

| Layer          | Technology |
|----------------|------------|
| Framework      | [Expo](https://expo.dev) / React Native 0.79, React 19 |
| Navigation     | React Navigation (native-stack + bottom-tabs) |
| State          | Redux Toolkit + `redux-persist` (AsyncStorage) |
| Backend / Auth | Firebase (Auth + Firestore) |
| Payments       | Stripe React Native SDK, with a payment-intent created by a small external API |

## App Flow

This is the end-to-end user journey through the app:

```
Onboarding ──▶ Sign Up / Login ──▶ Home (browse by city)
                                       │
                 ┌─────────────────────┼───────────────────────┐
                 ▼                     ▼                       ▼
             Search              Event Detail            My Tickets (Events tab)
          (filter events)      (pick ticket qty)          (past bookings)
                                       │                       │
                                       ▼                       ▼
                                 Payment Page            Booking Detail
                              (Stripe card entry)     (cancel / change qty)
                                       │
                                       ▼
                               Booking Confirmed
                                       │
                                       ▼
                    Notification created ──▶ Notifications tab
```

**Step by step:**

1. **Onboarding** — a short auto-advancing carousel introduces the app, with a Skip straight to Login.
2. **Sign Up / Login** — Firebase email/password authentication. On login, the user's profile and existing bookings are loaded into Redux.
3. **Home** — events are loaded from Firestore and can be filtered by city via a bottom-sheet picker. Shows "Upcoming Events" and "Nearby You" sections.
4. **Search** — filters the loaded events by name.
5. **Event Detail** — shows event info and lets the user choose ticket quantity before booking.
6. **Payment** — Stripe `CardField` collects card details; a payment intent is created via a backend API and confirmed client-side.
7. **Booking Confirmed** — success screen, then the booking is written to Firestore and a notification is generated.
8. **My Tickets (Events tab)** — lists the signed-in user's bookings.
9. **Booking Detail** — view a booking, cancel it, or change the ticket quantity.
10. **Notifications** — shows booking-related alerts, dismissible.
11. **Profile** — sign out (clears the persisted Redux store and returns to the auth flow).

## Project Structure

```
src/
├── config/firebase.js        Firebase app/auth/firestore init
├── constant/                 Screen name routes, colors, dummy seed data
├── hooks/useAuthentication.js Firebase auth-state listener
├── navigator/                Auth, Home, Event, and Tab navigators
├── screens/
│   ├── onboarding/
│   ├── auth/                 Login, SignUp, ResetPassword (+ verification)
│   └── home/
│       ├── EventScreen/      "My Tickets" tab
│       ├── SearchScreen/
│       ├── NotificationScreen/
│       ├── ProfileScreen/
│       └── EventDetail/
│           ├── PaymentPage/
│           ├── BookingConfirmPage/
│           └── BookingDetailPage/
└── store/                     Redux Toolkit store, reducers, actions
```

## Getting Started

### Prerequisites

- Node.js and npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- A Firebase project (Auth + Firestore enabled)
- A Stripe account (test mode is fine)

### Setup

```bash
git clone <this-repo-url>
cd TicktEase-App
npm install
```

Create a `.env` file in the project root (this file is gitignored — never commit it):

```bash
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
STRIPE_SECRET_KEY=
```

These are exposed to the app via `app.config.js`'s `extra` field and read through `expo-constants`.

### Run

```bash
npx expo start      # dev server, scan QR with Expo Go
npm run android      # run on Android emulator/device
npm run ios           # run on iOS simulator/device
```

## Known Limitations

This is a prototype/learning project with a few rough edges worth knowing about before extending it:

- **Shared document pattern**: events, bookings, and the user list are each stored as one big array inside a single Firestore document (`Events/...`, `bookings/bookingArr`, `Users/usersArr`), filtered client-side rather than queried. This won't scale and risks write conflicts under concurrent use.
- **Payment architecture**: the Stripe secret key is currently passed from the client to the backend as a bearer token to create a payment intent. Secret keys should only ever be used server-side — the backend should hold its own copy instead of receiving it from the app.
- **Profile screen** shows static placeholder data rather than the signed-in user's real profile.
- **Booking IDs** are generated from array length rather than a unique ID, which can collide.
- A few reducer action types (`ADD_BOOKINGS`, `SET_BOOKED_EVENTS`) reference state that isn't initialized and would throw if dispatched; `notificationReducer.js` is an empty, unused file.

## Environment & Secrets

`.env` is gitignored. Get Firebase/Stripe values from whoever set up the project through a secure channel (not git). See [app.config.js](app.config.js) for how env vars map into the Expo config.

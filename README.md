# Sree Learn

A MERN learning platform for children aged roughly 10–16. Built around learning
paths rather than video libraries: short lessons through the week, a live class,
a quiz, and something the child actually builds.

Four tracks ship with the seed data — Chess, Web Development, AI & ML, and
Cybersecurity.

---

## Running it

You need Node 18+ and MongoDB (local, or a free Atlas cluster).

```bash
# 1. API
cd server
npm install
cp .env.example .env          # then set MONGO_URI and JWT_SECRET
npm run seed                  # loads the four tracks + demo accounts
npm run dev                   # http://localhost:5000

# 2. Client, in a second terminal
cd client
npm install
npm run dev                   # http://localhost:5173
```

Vite proxies `/api` to port 5000, so there is nothing else to configure.

### Demo accounts

| Role    | Email                    | Password    |
| ------- | ------------------------ | ----------- |
| Student | student@sreelearn.test   | password123 |
| Parent  | parent@sreelearn.test    | password123 |
| Teacher | teacher@sreelearn.test   | password123 |

The parent account is already linked to the student. To link a new child, the
parent enters the code from the child's profile (`SREE01` for the demo student).

---

## What is built

This covers the ten MVP items, plus project submission and review.

| # | Feature | Where |
| - | ------- | ----- |
| 1 | Student login | `pages/Login.jsx`, `authController` |
| 2 | Parent login and child linking | `ParentDashboard`, `POST /auth/link-child` |
| 3 | Course catalogue and enrolment | `Catalog.jsx`, `CourseDetail.jsx` |
| 4 | Micro lessons with completion tracking | `Learn.jsx`, `POST /enrollments/:id/lessons` |
| 5 | Weekly live-class schedule | `LiveClasses.jsx` |
| 6 | Meet/Zoom link handling | `POST /live-classes/:id/join` |
| 7 | Quizzes with scoring and explanations | `Learn.jsx`, `POST /enrollments/:id/quiz` |
| 8 | Progress tracking and skill maps | `RankMeter`, `recomputeSkills()` |
| 9 | Teacher dashboard | `TeacherDashboard.jsx` |
| 10 | Certificate on completion | auto-issued at 100% in `completeLesson` |

Left for later, as planned: gamification, badges, leaderboards, AI tutor,
coding playground, embedded chess board, mobile app.

---

## How the interesting parts work

**Skill maps.** Every lesson declares which skill it feeds (`lesson.skill`).
When a student completes a lesson, `recomputeSkills()` recounts lessons-done
against lessons-total per skill and rewrites `enrollment.skillProgress`. So the
skill map is derived, never hand-maintained — adding a lesson automatically
changes what "CSS 70%" means.

**Progress as segmented cells.** All progress in the UI is drawn by one
component, `RankMeter`, as discrete filled squares rather than a smooth bar. It
reads like a rank on a chessboard, which ties the coding tracks back to the
chess identity. Course progress, skill maps and quiz results all use it, so
progress looks like one idea across the product instead of three widgets.

**Two dashboards, deliberately different.** The child sees one next action
("Continue learning") and their own progress. The parent sees hours, attendance,
skill breakdowns and teacher feedback — the things a buyer wants to see. They
read the same data through different queries (`myEnrollments` vs `childReport`).

**Live-class links are gated.** `meetingUrl` is withheld from the API response
until 15 minutes before the class starts, and joining records attendance, which
is what drives the attendance percentage on the parent dashboard.

**Quiz answer keys never reach the browser.** `correctIndex` is stripped from
every course payload unless the requester is a teacher. Answers are graded
server-side and explanations come back with the result.

---

## Data model

```
User          role: student | parent | teacher | admin
              students carry a linkCode; parents carry children[]

Course        track, ageMin/Max, price, durationWeeks
  └ skills[]        the skill map axes
  └ levels[]
      └ lessons[]   title, minutes, type, skill
      └ quiz        questions[] with correctIndex
      └ project     title, brief

Enrollment    student + course (unique pair)
              completedLessons[], quizAttempts[], skillProgress[],
              minutesLearned, activity[], certificateIssuedAt

LiveClass     course, teacher, startsAt, meetingUrl, attendance[]

Submission    student project + teacher feedback
```

`activity[]` is an append-only log of what the child did and when. It is what
makes "4h 20m this week" on the parent dashboard possible without a separate
analytics store.

---

## API

All routes are under `/api`. Authenticated routes take `Authorization: Bearer <token>`.

```
POST   /auth/register            name, email, password, role, age
POST   /auth/login
GET    /auth/me
POST   /auth/link-child          parent only — linkCode

GET    /courses                  ?track=&age=
GET    /courses/:slug
POST   /courses                  teacher/admin
PATCH  /courses/:id              teacher/admin

POST   /enrollments              student — courseId
GET    /enrollments              ?studentId= (parents may read their own child)
GET    /enrollments/:id
POST   /enrollments/:id/lessons  lessonId, minutes
POST   /enrollments/:id/quiz     levelId, answers[]

GET    /live-classes             upcoming, for the signed-in student
POST   /live-classes/:id/join    returns meetingUrl, records attendance
POST   /live-classes             teacher/admin
GET    /teacher/schedule         teacher/admin

GET    /parent/children
GET    /parent/children/:id/report

POST   /submissions              student project
GET    /submissions
GET    /teacher/review-queue     teacher/admin
PATCH  /submissions/:id/review   teacher/admin — feedback, status
```

---

## Adding a course

Edit `server/src/data/courses.js` and re-run `npm run seed`. Two rules keep the
skill map honest:

- every lesson's `skill` must match a name in the course's `skills[]`
- every declared skill needs at least one lesson, or it sits at 0% forever

---

## Before this goes live

Things deliberately left as stubs, since they need real accounts:

- **Payments.** `priceCents` exists but enrolment does not charge. Wire Razorpay
  or Stripe into `POST /enrollments` and gate on a paid order.
- **Video hosting.** `lesson.videoUrl` renders a plain `<video>`. Use Mux,
  Cloudflare Stream, or Vimeo with signed URLs so lessons cannot be hotlinked.
- **Meeting links.** Currently static strings. Generate per-class links via the
  Zoom or Google Meet API.
- **Email.** No verification or reset flow yet.
- **Refresh tokens.** The JWT lives in `localStorage` and lasts 7 days. For a
  product handling children's data, move to httpOnly cookies with rotation.

Given the audience, check what your local rules require on children's data and
parental consent before launch.

---

## Stack

React 18, React Router 6, Tailwind 3, Vite · Node 18, Express 4, Mongoose 8,
JWT, bcrypt.

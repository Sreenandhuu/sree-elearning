import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';

import * as auth from '../controllers/authController.js';
import * as courses from '../controllers/courseController.js';
import * as enrollments from '../controllers/enrollmentController.js';
import * as live from '../controllers/liveClassController.js';
import * as parent from '../controllers/parentController.js';
import * as submissions from '../controllers/submissionController.js';

const router = Router();

// --- auth ---
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
router.get('/auth/me', requireAuth, auth.me);
router.post('/auth/link-child', requireAuth, requireRole('parent'), auth.linkChild);

// --- catalog ---
router.get('/courses', courses.listCourses);
router.get('/courses/:slug', courses.getCourse);
router.post('/courses', requireAuth, requireRole('admin', 'teacher'), courses.createCourse);
router.patch('/courses/:id', requireAuth, requireRole('admin', 'teacher'), courses.updateCourse);

// --- learning ---
router.post('/enrollments', requireAuth, requireRole('student'), enrollments.enroll);
router.get('/enrollments', requireAuth, enrollments.myEnrollments);
router.get('/enrollments/:id', requireAuth, enrollments.getEnrollment);
router.post('/enrollments/:id/lessons', requireAuth, requireRole('student'), enrollments.completeLesson);
router.post('/enrollments/:id/quiz', requireAuth, requireRole('student'), enrollments.submitQuiz);

// --- live classes ---
router.get('/live-classes', requireAuth, live.upcomingForStudent);
router.post('/live-classes/:id/join', requireAuth, requireRole('student'), live.joinClass);
router.post('/live-classes', requireAuth, requireRole('teacher', 'admin'), live.createClass);
router.get('/teacher/schedule', requireAuth, requireRole('teacher', 'admin'), live.teacherSchedule);

// --- parent ---
router.get('/parent/children', requireAuth, requireRole('parent'), parent.listChildren);
router.get('/parent/children/:childId/report', requireAuth, parent.childReport);

// --- projects ---
router.post('/submissions', requireAuth, requireRole('student'), submissions.submitProject);
router.get('/submissions', requireAuth, requireRole('student'), submissions.mySubmissions);
router.get('/teacher/review-queue', requireAuth, requireRole('teacher', 'admin'), submissions.reviewQueue);
router.patch('/submissions/:id/review', requireAuth, requireRole('teacher', 'admin'), submissions.reviewSubmission);

export default router;

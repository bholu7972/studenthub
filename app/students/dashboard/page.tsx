import React from 'react';
import { Book, Calendar, ChartBar, 
    // Announcement, UserPlus 
} from 'lucide-react';

interface Course {
  name: string;
  progress?: number; // Optional progress indicator
}

interface Assignment {
  name: string;
  dueDate: string;
  status?: 'pending' | 'submitted' | 'graded';
}

interface Grade {
  course: string;
  score: number;
}

interface AnnouncementItem {
  date: string;
  text: string;
}

interface Event {
  name: string;
  date: string;
}

const StudentDashboard: React.FC = () => {
  const studentName = "Alice Wonderland";
  const lastLogin = "May 1, 2025, 10:00 AM";
  const courses: Course[] = [
    { name: "Introduction to React", progress: 75 },
    { name: "Calculus I", progress: 60 },
    { name: "World History 101", progress: 88 },
  ];
  const assignments: Assignment[] = [
    { name: "React Component Project", dueDate: "May 5, 2025", status: 'pending' },
    { name: "Calculus Problem Set 3", dueDate: "May 8, 2025", status: 'submitted' },
    { name: "History Essay", dueDate: "May 12, 2025", status: 'pending' },
  ];
  const recentGrades: Grade[] = [
    { course: "Introduction to React", score: 92 },
    { course: "Calculus I", score: 85 },
  ];
  const announcements: AnnouncementItem[] = [
    { date: "Apr 30, 2025", text: "Reminder: Midterm exams next week." },
    { date: "Apr 28, 2025", text: "Guest lecture on web development on Friday at 2 PM in Hall A." },
  ];
  const events: Event[] = [
    { name: "Math Club Meeting", date: "May 3, 2025" },
    { name: "React Workshop", date: "May 7, 2025" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Student Dashboard
              </h1>
              <p className="text-sm text-gray-500">Welcome back, {studentName}!</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Last Login: {lastLogin}</p>
              {/* Add notification icon or profile link here */}
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
              <Book className="h-8 w-8 text-indigo-500" />
              <div>
                <p className="text-gray-600 font-medium">Courses Enrolled</p>
                <p className="text-xl font-semibold text-indigo-700">{courses.length}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-gray-600 font-medium">Assignments Due Soon</p>
                <p className="text-xl font-semibold text-green-700">{assignments.filter(a => a.status === 'pending').length}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
              <ChartBar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-gray-600 font-medium">Average Grade</p>
                {recentGrades.length > 0 ? (
                  <p className="text-xl font-semibold text-blue-700">
                    {Math.round(recentGrades.reduce((sum, grade) => sum + grade.score, 0) / recentGrades.length)}%
                  </p>
                ) : (
                  <p className="text-xl font-semibold text-gray-400">N/A</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Courses Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
              <a href="/courses" className="text-indigo-500 hover:underline text-sm font-medium">View All</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {courses.map((course) => (
                <li key={course.name} className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 font-medium">{course.name}</p>
                    {course.progress !== undefined && (
                      <div className="text-sm text-gray-500">Progress: {course.progress}%</div>
                    )}
                  </div>
                  {course.progress !== undefined && (
                    <div className="bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-indigo-500 rounded-full h-2" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Assignments Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Assignments</h2>
              <a href="/assignments" className="text-indigo-500 hover:underline text-sm font-medium">View All</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <li key={assignment.name} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">{assignment.name}</p>
                      <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                    </div>
                    {assignment.status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                    {assignment.status === 'submitted' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Submitted
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Announcements Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Announcements</h2>
              <a href="/announcements" className="text-indigo-500 hover:underline text-sm font-medium">View All</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <li key={announcement.date} className="py-3">
                  <p className="text-gray-700 font-medium">{announcement.text}</p>
                  <p className="text-sm text-gray-500">{announcement.date}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Calendar/Events Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              <a href="/calendar" className="text-indigo-500 hover:underline text-sm font-medium">View All</a>
            </div>
            <ul>
              {events.map((event) => (
                <li key={event.name} className="py-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-700 font-medium">{event.name}</p>
                    <span className="text-sm text-gray-500">({event.date})</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
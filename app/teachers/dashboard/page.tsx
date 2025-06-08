import React from 'react';
import { Book, Calendar, 
    // ChartBar, Announcement, 
    UserPlus, Users } from 'lucide-react';

interface Course {
  name: string;
  section: string;
  studentCount: number;
}

interface AssignmentToGrade {
  name: string;
  submissions: number;
}

interface Student {
  name: string;
}

interface Event {
  name: string;
  date: string;
}

const TeacherDashboard: React.FC = () => {
  const teacherName = "Professor Snape";
  const lastLogin = "May 2, 2025, 08:15 AM";
  const courses: Course[] = [
    { name: "Potions Masterclass", section: "Section A", studentCount: 35 },
    { name: "Advanced Potion-Making", section: "Section B", studentCount: 28 },
  ];
  const assignmentsToGrade: AssignmentToGrade[] = [
    { name: "Elixir of Life Essays", submissions: 25 },
    { name: "Wiggenweld Potion Brewing", submissions: 18 },
  ];
  const recentStudents: Student[] = [
    { name: "Harry Potter" },
    { name: "Hermione Granger" },
    { name: "Ron Weasley" },
  ];
  const events: Event[] = [
    { name: "Faculty Meeting", date: "May 4, 2025" },
    { name: "Parent-Teacher Conference", date: "May 9, 2025" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Teacher Dashboard
              </h1>
              <p className="text-sm text-gray-500">Welcome back, {teacherName}!</p>
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
                <p className="text-gray-600 font-medium">Courses Teaching</p>
                <p className="text-xl font-semibold text-indigo-700">{courses.length}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-gray-600 font-medium">Assignments to Grade</p>
                <p className="text-xl font-semibold text-yellow-700">{assignmentsToGrade.reduce((sum, a) => sum + a.submissions, 0)}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-gray-600 font-medium">Total Students</p>
                <p className="text-xl font-semibold text-green-700">{courses.reduce((sum, course) => sum + course.studentCount, 0)}</p>
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
              <a href="/teacher/courses" className="text-indigo-500 hover:underline text-sm font-medium">Manage All</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {courses.map((course) => (
                <li key={course.name} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.section} - {course.studentCount} Students</p>
                    </div>
                    {/* Add quick actions for each course if needed */}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Assignments to Grade Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Assignments to Grade</h2>
              <a href="/teacher/grading" className="text-indigo-500 hover:underline text-sm font-medium">Go to Grading</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {assignmentsToGrade.map((assignment) => (
                <li key={assignment.name} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">{assignment.name}</p>
                      <p className="text-sm text-gray-500">{assignment.submissions} Submissions</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {assignment.submissions} Pending
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Students Section */}
          <section className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Students</h2>
              <a href="/teacher/students" className="text-indigo-500 hover:underline text-sm font-medium">View All</a>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentStudents.map((student) => (
                <li key={student.name} className="py-3">
                  <div className="flex items-center space-x-3">
                    <UserPlus className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-700 font-medium">{student.name}</p>
                  </div>
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

export default TeacherDashboard;
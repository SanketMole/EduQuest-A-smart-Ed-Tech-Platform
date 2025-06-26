import React, { useState } from 'react';
import Layout from '../Layout';
import StudentCourses from './StudentCourses';
import StudentPerformance from './StudentPerformance';
import StudentAssignments from './StudentAssignments';
import StudentCalendar from './StudentCalendar';
import StudentDashboard from './StudentDashboard';

const StudentInterface = ({ onSignOut }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock student data
  const student = {
    id: 1,
    name: "John Doe",
    rollNumber: "2023CS001",
    email: "john.doe@example.com"
  };

  // Mock courses data
  const courses = [
    {
      id: 1,
      name: 'Introduction to Programming',
      description: 'Learn the basics of programming with Python',
      progress: 75,
      assignments: [
        { id: 1, title: 'Variables and Data Types', completed: true, score: 85 },
        { id: 2, title: 'Control Structures', completed: true, score: 92 },
        { id: 3, title: 'Functions', completed: false },
      ],
    },
    {
      id: 2,
      name: 'Data Structures',
      description: 'Advanced concepts in data structures and algorithms',
      progress: 60,
      assignments: [
        { id: 1, title: 'Arrays and Linked Lists', completed: true, score: 88 },
        { id: 2, title: 'Trees and Graphs', completed: false },
      ],
    },
    {
      id: 3,
      name: 'Web Development',
      description: 'Learn HTML, CSS, and JavaScript',
      progress: 40,
      assignments: [
        { id: 1, title: 'HTML Basics', completed: true, score: 95 },
        { id: 2, title: 'CSS Styling', completed: false },
      ],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <StudentDashboard student={student} courses={courses} />;
      case 'courses':
        return <StudentCourses />;
      case 'assignments':
        return (
          <StudentAssignments
            courses={courses}
            onNavigateToPerformance={() => setActiveSection('performance')}
          />
        );
      case 'performance':
        return <StudentPerformance student={student} courses={courses} />;
      case 'calendar':
        return <StudentCalendar />;
      default:
        return <StudentDashboard student={student} courses={courses} />;
    }
  };

  return (
    <Layout onSignOut={onSignOut} role="student" onNavigate={setActiveSection}>
      {renderContent()}
    </Layout>
  );
};

export default StudentInterface;
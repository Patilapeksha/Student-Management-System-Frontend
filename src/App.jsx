import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Admin
import StudentManagement from "./pages/StudentManagement";
import TeacherManagement from "./pages/TeacherManagement";
import AttendanceReport from "./pages/AttendanceReport";
import FeeReport from "./pages/Fee Report";

// Teacher
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherGrades from "./pages/TeacherGrades";
import ClassRoster from "./pages/ClassRoster";

// Student
import StudentProfile from "./pages/StudentProfile";
import StudentAttendance from "./pages/StudentAttendance";
import StudentGrades from "./pages/StudentGrades";
import StudentFees from "./pages/StudentFees";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/403" element={<Forbidden />} />


        {/* ================= ADMIN ================= */}

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/students"
            element={<StudentManagement />}
          />

          <Route
            path="/admin/teachers"
            element={<TeacherManagement />}
          />

          <Route
            path="/admin/attendance"
            element={<AttendanceReport />}
          />

          <Route
            path="/admin/fees"
            element={<FeeReport />}
          />

        </Route>


        {/* ================= TEACHER ================= */}

        <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>

          <Route
            path="/teacher"
            element={<TeacherDashboard />}
          />

          <Route
            path="/teacher/roster"
            element={<ClassRoster />}
          />

          <Route
            path="/teacher/attendance"
            element={<TeacherAttendance />}
          />

          <Route
            path="/teacher/grades"
            element={<TeacherGrades />}
          />

        </Route>


        {/* ================= STUDENT ================= */}

        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>

          <Route
            path="/student"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/profile"
            element={<StudentProfile />}
          />

          <Route
            path="/student/attendance"
            element={<StudentAttendance />}
          />

          <Route
            path="/student/grades"
            element={<StudentGrades />}
          />

          <Route
            path="/student/fees"
            element={<StudentFees />}
          />

        </Route>


        {/* ================= DEFAULT ================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
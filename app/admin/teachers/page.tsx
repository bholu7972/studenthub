import AdminLayout from "@/components/AdminLayout"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavigateButton from "@/components/NavigateButton"

export default function TeachersPage() {
  const teachers = [
    // Mathematics Teachers
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      gradeLevel: "11-12",
      email: "sarah.johnson@example.com",
      students: 45,
      joinDate: "2023-09-01",
      department: "Mathematics",
      education: "Ph.D. in Mathematics",
      specialization: ["Advanced Calculus", "Linear Algebra", "Statistics"],
      rating: 4.8,
      status: "Active",
      courses: [
        { name: "Mathematics Grade 12", students: 25 },
        { name: "Mathematics Grade 11", students: 20 }
      ],
      officeHours: "Mon-Fri: 10:00 AM - 12:00 PM",
      contact: {
        phone: "+1 (555) 123-4567",
        office: "Room 301, Building A"
      }
    },
    {
      id: 2,
      name: "Prof. Alan Turner",
      subject: "Mathematics",
      gradeLevel: "9-10",
      email: "alan.turner@example.com",
      students: 50,
      joinDate: "2023-08-15",
      department: "Mathematics",
      education: "M.Sc. in Mathematics Education",
      specialization: ["Algebra", "Geometry", "Trigonometry"],
      rating: 4.7,
      status: "Active",
      courses: [
        { name: "Mathematics Grade 10", students: 28 },
        { name: "Mathematics Grade 9", students: 22 }
      ],
      officeHours: "Mon-Thu: 11:00 AM - 1:00 PM",
      contact: {
        phone: "+1 (555) 234-5678",
        office: "Room 302, Building A"
      }
    },
    {
      id: 3,
      name: "Ms. Rachel Green",
      subject: "Mathematics",
      gradeLevel: "6-8",
      email: "rachel.green@example.com",
      students: 55,
      joinDate: "2023-08-20",
      department: "Mathematics",
      education: "B.Ed. in Mathematics",
      specialization: ["Basic Algebra", "Pre-Geometry", "Number Theory"],
      rating: 4.6,
      status: "Active",
      courses: [
        { name: "Mathematics Grade 8", students: 30 },
        { name: "Mathematics Grade 7", students: 25 }
      ],
      officeHours: "Tue-Fri: 9:00 AM - 11:00 AM",
      contact: {
        phone: "+1 (555) 345-6789",
        office: "Room 303, Building A"
      }
    },
    // Science Teachers
    {
      id: 4,
      name: "Dr. Michael Chen",
      subject: "Physics",
      gradeLevel: "11-12",
      email: "michael.chen@example.com",
      students: 40,
      joinDate: "2023-07-15",
      department: "Science",
      education: "Ph.D. in Physics",
      specialization: ["Mechanics", "Electricity", "Modern Physics"],
      rating: 4.9,
      status: "Active",
      courses: [
        { name: "Physics Grade 12", students: 22 },
        { name: "Physics Grade 11", students: 18 }
      ],
      officeHours: "Mon-Wed: 2:00 PM - 4:00 PM",
      contact: {
        phone: "+1 (555) 456-7890",
        office: "Room 201, Science Wing"
      }
    },
    {
      id: 5,
      name: "Dr. Emily Rodriguez",
      subject: "Biology",
      gradeLevel: "9-12",
      email: "emily.rodriguez@example.com",
      students: 45,
      joinDate: "2023-08-01",
      department: "Science",
      education: "Ph.D. in Biology",
      specialization: ["Genetics", "Human Biology", "Ecology"],
      rating: 4.7,
      status: "Active",
      courses: [
        { name: "Biology Grade 12", students: 23 },
        { name: "Biology Grade 11", students: 22 }
      ],
      officeHours: "Tue-Thu: 1:00 PM - 3:00 PM",
      contact: {
        phone: "+1 (555) 567-8901",
        office: "Room 202, Science Wing"
      }
    },
    {
      id: 6,
      name: "Dr. Maria Garcia",
      subject: "Chemistry",
      gradeLevel: "9-12",
      email: "maria.garcia@example.com",
      students: 42,
      joinDate: "2023-07-20",
      department: "Science",
      education: "Ph.D. in Chemistry",
      specialization: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
      rating: 4.8,
      status: "Active",
      courses: [
        { name: "Chemistry Grade 12", students: 20 },
        { name: "Chemistry Grade 11", students: 22 }
      ],
      officeHours: "Wed-Fri: 10:00 AM - 12:00 PM",
      contact: {
        phone: "+1 (555) 678-9012",
        office: "Room 203, Science Wing"
      }
    },
    // Language Arts Teachers
    {
      id: 7,
      name: "Ms. Jennifer Lee",
      subject: "English",
      gradeLevel: "11-12",
      email: "jennifer.lee@example.com",
      students: 48,
      joinDate: "2023-08-10",
      department: "Language Arts",
      education: "M.A. in English Literature",
      specialization: ["Literature", "Creative Writing", "Grammar"],
      rating: 4.8,
      status: "Active",
      courses: [
        { name: "English Grade 12", students: 25 },
        { name: "English Grade 11", students: 23 }
      ],
      officeHours: "Mon-Thu: 9:30 AM - 11:30 AM",
      contact: {
        phone: "+1 (555) 789-0123",
        office: "Room 101, Arts Building"
      }
    },
    {
      id: 8,
      name: "Mr. David Wilson",
      subject: "English",
      gradeLevel: "9-10",
      email: "david.wilson@example.com",
      students: 52,
      joinDate: "2023-08-05",
      department: "Language Arts",
      education: "B.Ed. in English Education",
      specialization: ["Writing Skills", "Reading Comprehension", "Public Speaking"],
      rating: 4.6,
      status: "Active",
      courses: [
        { name: "English Grade 10", students: 27 },
        { name: "English Grade 9", students: 25 }
      ],
      officeHours: "Tue-Fri: 1:30 PM - 3:30 PM",
      contact: {
        phone: "+1 (555) 890-1234",
        office: "Room 102, Arts Building"
      }
    },
    // Social Studies Teachers
    {
      id: 9,
      name: "Dr. Robert Kim",
      subject: "History",
      gradeLevel: "9-12",
      email: "robert.kim@example.com",
      students: 45,
      joinDate: "2023-07-25",
      department: "Social Studies",
      education: "Ph.D. in History",
      specialization: ["World History", "American History", "Modern History"],
      rating: 4.7,
      status: "Active",
      courses: [
        { name: "History Grade 12", students: 22 },
        { name: "History Grade 11", students: 23 }
      ],
      officeHours: "Mon-Wed: 11:30 AM - 1:30 PM",
      contact: {
        phone: "+1 (555) 901-2345",
        office: "Room 401, Social Studies Wing"
      }
    },
    {
      id: 10,
      name: "Ms. Sophie Martin",
      subject: "Geography",
      gradeLevel: "9-12",
      email: "sophie.martin@example.com",
      students: 44,
      joinDate: "2023-08-12",
      department: "Social Studies",
      education: "M.A. in Geography",
      specialization: ["Physical Geography", "Human Geography", "Environmental Studies"],
      rating: 4.8,
      status: "Active",
      courses: [
        { name: "Geography Grade 10", students: 24 },
        { name: "Geography Grade 9", students: 20 }
      ],
      officeHours: "Wed-Fri: 2:30 PM - 4:30 PM",
      contact: {
        phone: "+1 (555) 012-3456",
        office: "Room 402, Social Studies Wing"
      }
    }
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teachers</h1>
            <p className="text-gray-500 mt-2">Manage and view all faculty members</p>
          </div>
          <NavigateButton href="/admin/teachers/add" className="bg-blue-600 hover:bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add New Teacher
          </NavigateButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{teacher.name}</h3>
                      <p className="text-gray-600">{teacher.department}</p>
                    </div>
                    <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'} className={teacher.status === 'Active' ? 'bg-green-500' : ''}>
                      {teacher.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="info" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Education</label>
                      <p className="font-medium">{teacher.education}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Rating</label>
                      <p className="font-medium flex items-center">
                        {teacher.rating}
                        <span className="text-yellow-400 ml-1">★</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Specialization</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {teacher.specialization.map((spec) => (
                        <Badge key={spec} variant="outline">{spec}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4 mt-4">
                  {teacher.courses.map((course) => (
                    <div key={course.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-gray-500">{course.students} students</p>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{teacher.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{teacher.contact.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Office</label>
                      <p className="font-medium">{teacher.contact.office}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Office Hours</label>
                      <p className="font-medium">{teacher.officeHours}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}





// import AdminLayout from "@/components/AdminLayout";

// export default function Page() {
//   return (
//     <AdminLayout>
//       <h1>Teachers page</h1>
//     </AdminLayout>
//   );
// }

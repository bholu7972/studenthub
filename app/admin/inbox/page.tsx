import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminLayout from "@/components/AdminLayout";

export default function Page() {
  const messages = [
    {
      id: 1,
      sender: "Jane Smith",
      subject: "Assignment Submission",
      preview: "Hello, I've submitted my assignment...",
      date: "2024-01-10",
      unread: true,
    },
    {
      id: 2,
      sender: "John Doe",
      subject: "Project Update",
      preview: "Hey, just wanted to share the latest updates...",
      date: "2024-01-12",
      unread: false,
    },
    {
      id: 3,
      sender: "Emily Davis",
      subject: "Meeting Schedule",
      preview: "Can we reschedule the meeting for next week?",
      date: "2024-01-15",
      unread: true,
    },
    {
      id: 4,
      sender: "Michael Brown",
      subject: "Invoice Confirmation",
      preview: "Your payment has been received successfully...",
      date: "2024-01-18",
      unread: false,
    },
    {
      id: 5,
      sender: "Sophia Wilson",
      subject: "Event Invitation",
      preview: "You're invited to our annual celebration...",
      date: "2024-01-20",
      unread: true,
    }
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
        <Card>
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    message.unread ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{message.sender}</h3>
                      <p className="font-medium">{message.subject}</p>
                      <p className="text-sm text-gray-500">{message.preview}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {message.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </AdminLayout>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import AdminLayout from "@/components/AdminLayout";

// export default function Page() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const fadeInClass = mounted
//     ? "opacity-100 translate-y-0"
//     : "opacity-0 translate-y-4";
//   const transitionClass = "transition-all duration-300 ease-in-out";

//   return (
//     <AdminLayout>
//       <div className="bg-gray-100 min-h-screen py-8">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <header
//             className={`bg-white shadow rounded-lg p-6 mb-8 ${fadeInClass} ${transitionClass}`}
//           >
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Inbox Section{" "}
//               <span className="text-indigo-500 text-xl ml-2 animate-pulse">
//                 ✨
//               </span>
//             </h1>
//             <p className="text-sm text-gray-500">
//               Inbox section for admin users to manage messages.
//             </p>
//           </header>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

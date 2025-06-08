import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

export default function Page() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Search</h1>
          <Input
            type="search"
            placeholder="Search students, teachers, or courses..."
            className="max-w-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Students</h2>
            <div className="space-y-2">{/* Add student search results */}</div>
          </Card>

          <Card className="p-4">
            <h2 className="font-semibold mb-2">Teachers</h2>
            <div className="space-y-2">{/* Add teacher search results */}</div>
          </Card>

          <Card className="p-4">
            <h2 className="font-semibold mb-2">Courses</h2>
            <div className="space-y-2">{/* Add course search results */}</div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

// import AdminLayout from "@/components/AdminLayout";

// export default function Page() {
//   return (
//     <AdminLayout>
//       <h1>Search page</h1>
//     </AdminLayout>
//   );
// }

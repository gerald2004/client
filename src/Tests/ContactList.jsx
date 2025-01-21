import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    avatar: "https://via.placeholder.com/150",
  },
  // Add more contacts as needed
];

const ContactList = () => {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <CardTitle>{contact.name}</CardTitle>
                <CardDescription>{contact.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{contact.phone}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactList;

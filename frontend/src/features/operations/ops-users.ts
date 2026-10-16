export interface PlatformUserItem {
  id: string;
  displayName: string;
  email: string;
  role: "PLATFORM_ADMIN" | "OWNER" | "MANAGER" | "STAFF";
  organization: string;
  status: "ACTIVE" | "INVITED" | "DEACTIVATED";
  branchScope?: string | null;
  lastActive?: string;
}

export const PLATFORM_USERS: PlatformUserItem[] = [
  {
    id: "00000000-0000-4000-8000-0000000c0004",
    displayName: "Operations Admin",
    email: "admin@mock.test",
    role: "PLATFORM_ADMIN",
    organization: "TemelashCard Platform",
    status: "ACTIVE",
    lastActive: "Just now",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0014",
    displayName: "Platform Admin",
    email: "admin@temelashcard.test",
    role: "PLATFORM_ADMIN",
    organization: "TemelashCard Platform",
    status: "ACTIVE",
    lastActive: "10 mins ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0001",
    displayName: "Sample Owner",
    email: "owner@sample-cafe.test",
    role: "OWNER",
    organization: "Sample Cafe",
    status: "ACTIVE",
    lastActive: "1 hour ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0011",
    displayName: "Hana Owner",
    email: "owner@mock.test",
    role: "OWNER",
    organization: "Bole Bakery",
    status: "ACTIVE",
    lastActive: "2 hours ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0002",
    displayName: "Dawit Manager",
    email: "manager@mock.test",
    role: "MANAGER",
    organization: "Sample Cafe",
    status: "ACTIVE",
    lastActive: "Yesterday",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0005",
    displayName: "Rahel Reader",
    email: "viewer@mock.test",
    role: "MANAGER",
    organization: "Piassa Pharmacy",
    status: "ACTIVE",
    lastActive: "3 days ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0003",
    displayName: "Selam Cashier",
    email: "staff@mock.test",
    role: "STAFF",
    organization: "Sample Cafe (Bole & Piassa)",
    status: "ACTIVE",
    lastActive: "Today",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0013",
    displayName: "Bole Staff",
    email: "staff.bole@sample-cafe.test",
    role: "STAFF",
    organization: "Sample Cafe (Bole)",
    status: "ACTIVE",
    lastActive: "4 hours ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0006",
    displayName: "Abebe Waiter",
    email: "abebe.waiter@mock.test",
    role: "STAFF",
    organization: "Bole Bakery",
    status: "ACTIVE",
    lastActive: "Yesterday",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0007",
    displayName: "Sara Barista",
    email: "sara.barista@mock.test",
    role: "STAFF",
    organization: "Sample Cafe",
    status: "ACTIVE",
    lastActive: "2 days ago",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0008",
    displayName: "Almaz Cashier",
    email: "almaz.cashier@mock.test",
    role: "STAFF",
    organization: "Mercato Mart",
    status: "INVITED",
    lastActive: "Pending invitation",
  },
  {
    id: "00000000-0000-4000-8000-0000000c0009",
    displayName: "Chala Cashier",
    email: "chala.cashier@mock.test",
    role: "STAFF",
    organization: "Entoto Books",
    status: "DEACTIVATED",
    lastActive: "Deactivated",
  },
];

export function filterPlatformUsers(
  users: readonly PlatformUserItem[],
  filter: { search: string; role: string; status: string },
): PlatformUserItem[] {
  const q = filter.search.trim().toLowerCase();
  return users.filter(
    (u) =>
      (!filter.role || u.role === filter.role) &&
      (!filter.status || u.status === filter.status) &&
      (!q ||
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.organization.toLowerCase().includes(q)),
  );
}

import {
  GalleryVerticalEnd,
  SquareTerminal,
  Users,
  PiggyBank,
  ArrowUpFromLine,
  ArrowDownFromLine,
  Rotate3d,
  Tangent,
  SquareSquare,
  MessagesSquare,
  AtSign,
  Drill,
  Cable,
  FolderGit,
  BookUp2,
  Asterisk,
  School,
  Footprints,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useAuth from "@/MiddleWares/Hooks/useAuth";
import { NavSingle } from "./nav-single";

export function AppSidebar({ ...props }) {
  const { auth } = useAuth();
  const initials = `${auth?.client?.firstname?.[0]} ${auth?.client?.lastname?.[0]
  }`.toUpperCase();

  const data = {
    user: {
      name: `${auth?.client?.firstname} ${auth?.client?.lastname}`,
      email: auth?.client?.email,
      avatar: "/avatars/shadcn.jpg",
      initials: initials,
      contact: auth?.client?.contact,
    },
    teams: [
      {
        name: auth?.client?.sacco,
        logo: GalleryVerticalEnd,
        plan: auth?.client?.branch,
      },
    ],
    settings: {
      title: "Settings",
      items: [
        // {
        //   title: "SACCO Settings",
        //   url: "#",
        //   icon: Settings,
        //   items: [
        //     {
        //       title: "Business Profile",
        //       url: "#",
        //     },
        //     {
        //       title: "Business Defaults",
        //       url: "#",
        //     },
        //     {
        //       title: "Votes",
        //       url: "#",
        //     },
        //     {
        //       title: "Loan Products",
        //       url: "#",
        //     },
        //     {
        //       title: "Fixed Deposit Products",
        //       url: "#",
        //     },
        //     {
        //       title: "Withdraw Ranges",
        //       url: "#",
        //     },
        //     {
        //       title: "Account  Settings",
        //       url: "#",
        //     },
        //     {
        //       title: "Branch Management",
        //       url: "#",
        //     },
        //     {
        //       title: "Staff Managament",
        //       url: "#",
        //     },
        //     {
        //       title: "Vendor Management",
        //       url: "#",
        //     },
        //     {
        //       title: "Payroll Settings",
        //       url: "#",
        //     },
        //     {
        //       title: "Assets Settings",
        //       url: "#",
        //     },
        //     {
        //       title: "Notifications Settings",
        //       url: "#",
        //     },
        //   ],
        // },
        // {
        //   title: "System Settings",
        //   url: "#",
        //   icon: Settings2,
        //   items: [
        //     {
        //       title: "General Config",
        //       url: "#",
        //     },
        //     {
        //       title: "Roles",
        //       url: "#",
        //     },
        //     {
        //       title: "Back ups",
        //       url: "#",
        //     },
        //     {
        //       title: "Agent App Config",
        //       url: "#",
        //     },
        //     {
        //       title: "Client App Config",
        //       url: "#",
        //     },
        //     {
        //       title: "Client Portal",
        //       url: "#",
        //     },
        //     {
        //       title: "Activity Log",
        //       url: "#",
        //     },
        //     {
        //       title: "Limits",
        //       url: "#",
        //     },
        //   ],
        // },
      ],
    },
    dashboard: {
      title: "Home",
      items: [
        {
          name: "Dashboard",
          url: "dashboard",
          icon: SquareTerminal,
        },
      ],
    },
    clients: {
      title: "Transactions",
      items: [
        {
          name: "Transactions",
          url: "transactions",
          icon: Users,
        },
      ],
    },
    transactions: {
      title:
        "Savings, Withdraws, Fixed Deposits, Shares, Transfers",
      items: [
        {
          name: "My Savings",
          url: "savings",
          icon: ArrowUpFromLine,
        },
        {
          name: "My Withdraws",
          url: "withdraws",
          icon: ArrowDownFromLine,
        },
        {
          name: "Fixed Deposits",
          url: "fixed-deposits",
          icon: PiggyBank,
        },
        {
          name: "My Internal Transfers",
          url: "transfers",
          icon: Rotate3d,
        },
        {
          name: "My Shares",
          url: "shares",
          icon: Tangent,
        },
      ],
    },
    loans: {
      title: "Loans",
      items: [
        {
          name: "Loans",
          url: "loans",
          icon: SquareSquare,
        },
      ],
    },
   
    customer_care: {
      title: "Notifications, Utlities, CRB",
      items: [
        {
          name: "SMS",
          url: "#",
          icon: MessagesSquare,
        },
        {
          name: "Emails",
          url: "#",
          icon: AtSign,
        },
        {
          name: "Utilities",
          url: "#",
          icon: Drill,
        },
        {
          name: "Credit Reference Buerau",
          url: "#",
          icon: Asterisk,
        },
      ],
    },
    reports: {
      title: "Reports",
      items: [
        {
          name: "Daily Reports",
          url: "#",
          icon: Cable,
        },
        {
          name: "Accounting Reports",
          url: "#",
          icon: FolderGit,
        },
        {
          name: "Loans Reports",
          url: "#",
          icon: BookUp2,
        },
        {
          name: "Assets Reports",
          url: "#",
          icon: School,
        },
        {
          name: "Activity Log / Audit Trail",
          url: "#",
          icon: Footprints,
        },
      ],
    },
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSingle data={data.dashboard} />
        <NavSingle data={data.clients} />
        <NavSingle data={data.loans} />
        <NavSingle data={data.transactions} />
        {/* <NavSingle data={data.accounting} /> */}
        {/* <NavSingle data={data.human_resource} />
        <NavSingle data={data.customer_care} />
        <NavMain data={data.bulk_studio} /> */}
        <NavSingle data={data.reports} />
        <NavMain data={data.settings} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

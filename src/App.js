import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import { darkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// General styles
import "./style.scss";

// Fonts
import "./fonts/Rubik-Light.ttf";
import "./fonts/Rubik-Regular.ttf";
import "./fonts/Rubik-Medium.ttf";
import "./fonts/Rubik-SemiBold.ttf";
import "./fonts/Rubik-Bold.ttf";

// Loading Screen
import Overlay from "./components/loadingScreens/Overlay";

// // Components
// const Navbar = lazy(() => import("./components/navBar/Navbar"));
// const Leftbar = lazy(() => import("./components/leftBar/Leftbar"));
// const Rightbar = lazy(() => import("./components/rightBar/Rightbar"));
// const HelpCenterNavbar = lazy(() =>
//   import("./components/helpCenterNavBar/HelpCenterNavBar")
// );
// const HelpCenterLeftbar = lazy(() =>
//   import("./components/helpCenterLeftBar/HelpCenterLeftBar")
// );
// const HelpCenterFooter = lazy(() =>
//   import("./components/helpCenterFooter/HelpCenterFooter")
// );
// const AdvertsLeftBar = lazy(() =>
//   import("./components/advertsLeftbar/AdvertsLeftBar")
// );

// // Pages
// const Login = lazy(() => import("./pages/login/Login"));
// const Signup = lazy(() => import("./pages/signup/Signup"));
// const ResetUserPassword = lazy(() =>
//   import("./pages/resetPassword/ResetPassword")
// );
// const Home = lazy(() => import("./pages/home/Home"));
// const Interactions = lazy(() => import("./pages/interactions/Interactions"));
// const Notifications = lazy(() => import("./pages/notifications/Notifications"));
// const PostDetails = lazy(() => import("./pages/postDetails/PostDetails"));
// const Menu = lazy(() => import("./pages/menuPage/Menu"));

// //Profiles page
// const Chats = lazy(() => import("./pages/profileFolder/chats/Chats"));
// const EditProfile = lazy(() =>
//   import("./pages/profileFolder/editProfile/EditProfile")
// );
// const PersonalChat = lazy(() =>
//   import("./pages/profileFolder/personalChat/PersonalChat")
// );
// const Profile = lazy(() => import("./pages/profileFolder/profile/Profile"));
// const Settings = lazy(() => import("./pages/profileFolder/settings/Settings"));

// //Help and info pages
// const AboutUs = lazy(() => import("./pages/helpFolder/aboutUs/AboutUs"));
// const CookiePolicy = lazy(() =>
//   import("./pages/helpFolder/cookiePolicy/CookiePolicy")
// );
// const ContentsPolicy = lazy(() =>
//   import("./pages/helpFolder/contentsPolicy/ContentsPolicy")
// );
// const HelpCenter = lazy(() =>
//   import("./pages/helpFolder/helpCenter/HelpCenter")
// );
// const TermsOfUse = lazy(() =>
//   import("./pages/helpFolder/termsOfUse/TermsOfUse")
// );
// const AdvertisementPolicy = lazy(() =>
//   import("./pages/helpFolder/advertisementPolicy/AdvertisementPolicy")
// );
// const SupportInbox = lazy(() =>
//   import("./pages/helpFolder/supportInbox/SupportInbox")
// );
// const ContactUs = lazy(() => import("./pages/helpFolder/contactUs/ContactUs"));
// const HelpCenterMenu = lazy(() =>
//   import("./pages/helpFolder/helpCenterMenu/HelpCenterMenu")
// );
// const ReportProblem = lazy(() =>
//   import("./pages/helpFolder/reportAdProblem/ReportProblem")
// );

// //Adverts pages
// const AdsOverview = lazy(() =>
//   import("./pages/advertsFolder/AdsOverview/AdsOverview")
// );
// const AdsCampaign = lazy(() =>
//   import("./pages/advertsFolder/adsCampaign/AdsCampaign")
// );
// const CreateAd = lazy(() => import("./pages/advertsFolder/createAd/CreateAd"));
// const FundAccount = lazy(() =>
//   import("./pages/advertsFolder/fundAccount/FundAccount")
// );
// const AccountSettings = lazy(() =>
//   import("./pages/advertsFolder/adAccountSettings/AccountSettings")
// );
// const UserAdDetails = lazy(() =>
//   import("./pages/advertsFolder/adDetails/UserAdDetails")
// );

//Admin section
const SendEmail = lazy(() => import("./pages/emailBroadcast/sendEmail/SendEmail"));
const EmailBroadcast = lazy(() => import("./pages/emailBroadcast/EmailBroadcast"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const AdminLogin = lazy(() => import("./pages/login/AdminLogin"));
const ResetPassword = lazy(() =>
  import("./pages/resetPassword/ResetPassword")
);
const AdminNavbar = lazy(() => import("./pages/adminNavbar/AdminNavbar"));
const AdminLeftbar = lazy(() =>
  import("./pages/adminLeftbar/AdminLeftbar")
);
const Employees = lazy(() => import("./pages/employees/Employees"));
const Users = lazy(() => import("./pages/users/Users"));
const AddEmployees = lazy(() =>
  import("./pages/employees/addEmployees/AddEmployees")
);
const EmployeeDetails = lazy(() =>
  import("./pages/employees/employeeDetails/EmployeeDetails")
);
const EditEmployeeDetails = lazy(() =>
  import("./pages/employees/editEmployeeDetails/EditEmployeeDetails")
);
const Advertisements = lazy(() =>
  import("./pages/advertisements/Advertisements")
);
const AdDetails = lazy(() =>
  import("./pages/advertisements/adDetails/AdDetails")
);
const AdStatistics = lazy(() =>
  import("./pages/advertisements/adStatistics/AdStatistics")
);
const Approved = lazy(() =>
  import("./pages/advertisements/approved/Approved")
);
const Pending = lazy(() =>
  import("./pages/advertisements/pending/Pending")
);
const Rejected = lazy(() =>
  import("./pages/advertisements/rejected/Rejected")
);
const Pages = lazy(() => import("./pages/pages/Pages"));
const EditPages = lazy(() => import("./pages/pages/editPages/EditPages"));
const AddNewPage = lazy(() => import("./pages/pages/addNew/AddNewPage"));
const Inbox = lazy(() => import("./pages/inbox/Inbox"));

function App() {
  const { darkMode } = useContext(darkModeContext);
  const { loggedInUser } = useContext(AuthContext);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 6000, gcTime: 10 * (60 * 1000) } },
  });

  // Create my page view layout
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          {/* <Overlay/> */}
          <AdminNavbar />
          <div style={{ display: "flex" }}>
            <AdminLeftbar />
            <Outlet />
            {/* <Admin /> */}
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  // Create other page view layout
  // const HelpLayouts = () => {
  //   return (
  //     <div className={`theme-${darkMode ? "dark" : "light"}`}>
  //       <HelpCenterNavbar />
  //       <div style={{ display: "flex" }}>
  //         <HelpCenterLeftbar />
  //         <Outlet />
  //       </div>
  //       <HelpCenterFooter />
  //     </div>
  //   );
  // };

  // Ads page view
  // const AdsPageLayouts = () => {
  //   return (
  //     <div className={`theme-${darkMode ? "dark" : "light"}`}>
  //       <Navbar />
  //       <div style={{ display: "flex" }}>
  //         <AdvertsLeftBar />
  //         <Outlet />
  //       </div>
  //     </div>
  //   );
  // };

  // Apply my view layout to each page links
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Overlay />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "/employees/",
          element: (
            <Suspense fallback={<Overlay />}>
              <Employees />
            </Suspense>
          ),
        },
        {
          path: "/users/",
          element: (
            <Suspense fallback={<Overlay />}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "/employees/add-employee/",
          element: (
            <Suspense fallback={<Overlay />}>
              <AddEmployees />
            </Suspense>
          ),
        },
        {
          path: "/employees/employee-details/:id",
          element: (
            <Suspense fallback={<Overlay />}>
              <EmployeeDetails />
            </Suspense>
          ),
        },
        {
          path: "/employees/edit-details/:id",
          element: (
            <Suspense fallback={<Overlay />}>
              <EditEmployeeDetails />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/",
          element: (
            <Suspense fallback={<Overlay />}>
              <Advertisements />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/ad-details/:adId",
          element: (
            <Suspense fallback={<Overlay />}>
              <AdDetails />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/ad-stats/:adId",
          element: (
            <Suspense fallback={<Overlay />}>
              <AdStatistics />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/approved-adverts",
          element: (
            <Suspense fallback={<Overlay />}>
              <Approved />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/pending-adverts",
          element: (
            <Suspense fallback={<Overlay />}>
              <Pending />
            </Suspense>
          ),
        },
        {
          path: "/advertisements/rejected-adverts",
          element: (
            <Suspense fallback={<Overlay />}>
              <Rejected />
            </Suspense>
          ),
        },
        {
          path: "/pages",
          element: (
            <Suspense fallback={<Overlay />}>
              <Pages />
            </Suspense>
          ),
        },
        {
          path: "/pages/edit-page/:pageId",
          element: (
            <Suspense fallback={<Overlay />}>
              <EditPages />
            </Suspense>
          ),
        },
        {
          path: "/pages/add-new/",
          element: (
            <Suspense fallback={<Overlay />}>
              <AddNewPage />
            </Suspense>
          ),
        },
        {
          path: "/inbox/",
          element: (
            <Suspense fallback={<Overlay />}>
              <Inbox />
            </Suspense>
          ),
        },
        {
          path: "/email-broadcast/",
          element: (
            <Suspense fallback={<Overlay />}>
              <EmailBroadcast />
            </Suspense>
          ),
        },
        {
          path: "/email-broadcast/send-email",
          element: (
            <Suspense fallback={<Overlay />}>
              <SendEmail />
            </Suspense>
          ),
        },
      ],
    },

    // Admin login
    {
      path: "/login",
      element: (
        <Suspense fallback={<Overlay />}>
          <AdminLogin />
        </Suspense>
      ),
    },
    {
      path: "/reset-password/",
      element: (
        <Suspense fallback={<Overlay />}>
          <ResetPassword />
        </Suspense>
      ),
    },

    {
      // Wildcard route for unmatched paths
      path: "*",
      element: <Navigate to="/" replace />,
    },

    // General router link to all href links
    // {
    //   path: "/login",
    //   element: (
    //     <Suspense fallback={<Overlay />}>
    //       <Login />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "/signup",
    //   element: (
    //     <Suspense fallback={<Overlay />}>
    //       <Signup />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "/reset-user-password",
    //   element: (
    //     <Suspense fallback={<Overlay />}>
    //       <ResetUserPassword />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "/create-new-password/:resetCode",
    //   element: (
    //     <Suspense fallback={<Overlay />}>
    //       <CreateNewPassword />
    //     </Suspense>
    //   ),
    // },
  ]);

  // Load my app to be visible on the browser
  return (
    <div className="App">
      <Suspense fallback={<Overlay />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;

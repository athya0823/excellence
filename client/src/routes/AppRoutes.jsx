import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Faculty from "../pages/Faculty";
import Results from "../pages/Results";
import Testimonials from "../pages/Testimonials";
import Gallery from "../pages/Gallery";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import FAQs from "../pages/FAQs";
import Contact from "../pages/Contact";
import Admission from "../pages/Admission";
import NotFound from "../pages/NotFound";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:slug", element: <CourseDetails /> },
      { path: "faculty", element: <Faculty /> },
      { path: "results", element: <Results /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "gallery", element: <Gallery /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetails /> },
      { path: "faqs", element: <FAQs /> },
      { path: "contact", element: <Contact /> },
      { path: "admission", element: <Admission /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default AppRoutes;

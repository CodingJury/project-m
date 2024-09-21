import { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getRoutesBasedOnAuthentication } from "./core/helpers/route.helpers";
import FullScreenLoader from "./components/common/FullScreenLoader";


function App() {
  const routeActive = useMemo(() => getRoutesBasedOnAuthentication(), []);
  console.log({ routeActive });


  const router = createBrowserRouter(routeActive)

  return (
    <>
      <Suspense fallback={<FullScreenLoader open={true} />}>
        <RouterProvider router={router}/>
      </Suspense>
    </>
  )
}

export default App 

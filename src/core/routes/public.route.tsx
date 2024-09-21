import { lazy } from "react";
import { RoutesInterface } from "./interface";
import { HOME, MATH_GCD, MATH_LCM, MATH_SQTR, MATH_TRIANGLE } from "../constants/route.constants";

const HomePage = lazy(() => import("../../pages/home/home.page"))
const LcmPage = lazy(() => import('../../pages/lcm/lcm.page'))
const GcdPage = lazy(() => import('../../pages/gcd/gcd.page'))
const SqrtPage = lazy(() => import('../../pages/sqrt/sqrt.page'))
const TrianglePage = lazy(() => import('../../pages/triangle/triangle.page'))

export const PUBLIC_ROUTES: RoutesInterface[] = [
  { path: HOME, element: <HomePage/> },
  { path: MATH_LCM, element: <LcmPage/> },
  { path: MATH_GCD, element: <GcdPage/> },
  { path: MATH_SQTR, element: <SqrtPage/> },
  { path: MATH_TRIANGLE, element: <TrianglePage/> },
]
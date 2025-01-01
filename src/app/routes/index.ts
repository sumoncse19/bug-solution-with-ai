import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.routes'
import { SolutionRoutes } from '../modules/solution/solution.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/ask-query',
    route: SolutionRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router

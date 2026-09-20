import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../features/auth/presentation/login_page.dart';
import '../features/auth/presentation/signup_page.dart';
import '../features/dashboard/presentation/dashboard_page.dart';
import '../features/nutrition/presentation/nutrition_page.dart';
import '../features/social/presentation/social_page.dart';
import '../features/workouts/presentation/workout_detail_page.dart';
import '../features/workouts/presentation/workouts_page.dart';
import '../shared/presentation/shell_page.dart';

part 'router.g.dart';

/// Named routes
abstract class AppRoutes {
  static const login = '/login';
  static const signup = '/signup';
  static const dashboard = '/dashboard';
  static const workouts = '/workouts';
  static const workoutDetail = '/workouts/:id';
  static const nutrition = '/nutrition';
  static const social = '/social';
}

@Riverpod(keepAlive: true)
GoRouter router(RouterRef ref) {
  return GoRouter(
    initialLocation: AppRoutes.dashboard,
    debugLogDiagnostics: true,
    routes: [
      // Auth routes (no shell)
      GoRoute(
        path: AppRoutes.login,
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: AppRoutes.signup,
        name: 'signup',
        builder: (context, state) => const SignupPage(),
      ),

      // Main shell with bottom nav
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) =>
            ShellPage(navigationShell: navigationShell),
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.dashboard,
                name: 'dashboard',
                builder: (context, state) => const DashboardPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.workouts,
                name: 'workouts',
                builder: (context, state) => const WorkoutsPage(),
                routes: [
                  GoRoute(
                    path: ':id',
                    name: 'workoutDetail',
                    builder: (context, state) => WorkoutDetailPage(
                      planId: state.pathParameters['id']!,
                    ),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.nutrition,
                name: 'nutrition',
                builder: (context, state) => const NutritionPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.social,
                name: 'social',
                builder: (context, state) => const SocialPage(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
}

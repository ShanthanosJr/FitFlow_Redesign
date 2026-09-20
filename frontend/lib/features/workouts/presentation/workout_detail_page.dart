import 'package:flutter/material.dart';

class WorkoutDetailPage extends StatelessWidget {
  const WorkoutDetailPage({super.key, required this.planId});
  final String planId;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    final exercises = [
      ('Bench Press', '4 sets × 8 reps', '70 kg', Icons.fitness_center),
      ('Pull-ups', '3 sets × 10 reps', 'Bodyweight', Icons.accessibility_new),
      ('Shoulder Press', '3 sets × 10 reps', '20 kg', Icons.sports_gymnastics),
      ('Tricep Dips', '3 sets × 12 reps', 'Bodyweight', Icons.sports),
      ('Bent-over Row', '4 sets × 8 reps', '60 kg', Icons.fitness_center),
      ('Lateral Raise', '3 sets × 15 reps', '10 kg', Icons.self_improvement),
      ('Bicep Curl', '3 sets × 12 reps', '15 kg', Icons.sports_gymnastics),
      ('Face Pull', '3 sets × 15 reps', '20 kg', Icons.self_improvement),
    ];

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar.large(
            title: const Text('Upper Body Strength'),
            backgroundColor: cs.primary,
            foregroundColor: Colors.white,
            expandedHeight: 200,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [cs.primary, cs.tertiary],
                  ),
                ),
                child: const Center(
                  child: Icon(Icons.fitness_center,
                      size: 80, color: Colors.white24),
                ),
              ),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Stats row
                Row(
                  children: [
                    _StatChip(label: '45 min', icon: Icons.timer_outlined),
                    const SizedBox(width: 8),
                    _StatChip(label: '8 exercises', icon: Icons.list_outlined),
                    const SizedBox(width: 8),
                    _StatChip(label: 'Intermediate',
                        icon: Icons.bar_chart_outlined),
                  ],
                ),
                const SizedBox(height: 24),

                Text('Exercises', style: tt.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700)),
                const SizedBox(height: 12),

                ...exercises.map((e) => _ExerciseRow(
                      name: e.$1,
                      sets: e.$2,
                      weight: e.$3,
                      icon: e.$4,
                    )),

                const SizedBox(height: 32),
                FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.play_arrow),
                  label: const Text('Start workout'),
                  style: FilledButton.styleFrom(
                    minimumSize: const Size(double.infinity, 52),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14)),
                  ),
                ),
                const SizedBox(height: 32),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.label, required this.icon});
  final String label;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: cs.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: cs.primary),
          const SizedBox(width: 4),
          Text(label,
              style: TextStyle(
                  fontSize: 12,
                  color: cs.primary,
                  fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}

class _ExerciseRow extends StatelessWidget {
  const _ExerciseRow({
    required this.name,
    required this.sets,
    required this.weight,
    required this.icon,
  });

  final String name;
  final String sets;
  final String weight;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: cs.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 20, color: cs.primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name,
                    style: const TextStyle(fontWeight: FontWeight.w600)),
                Text(sets,
                    style: TextStyle(
                        fontSize: 12, color: cs.onSurfaceVariant)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: cs.secondary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(weight,
                style: TextStyle(
                    fontSize: 12,
                    color: cs.secondary,
                    fontWeight: FontWeight.w600)),
          ),
          const SizedBox(width: 8),
          Checkbox(value: false, onChanged: (_) {}),
        ],
      ),
    );
  }
}

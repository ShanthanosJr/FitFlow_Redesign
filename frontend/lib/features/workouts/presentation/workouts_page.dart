import 'package:flutter/material.dart';

class WorkoutsPage extends StatelessWidget {
  const WorkoutsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    final plans = [
      _PlanData('Upper Body Strength', '4 weeks · 3×/week',
          'Chest, shoulders, triceps & back.', Icons.accessibility_new,
          const Color(0xFF6C63FF)),
      _PlanData('HIIT Cardio Blast', '6 weeks · 4×/week',
          'Fat burning with interval training.', Icons.bolt,
          const Color(0xFFFF6B35)),
      _PlanData('Core & Mobility', '4 weeks · 5×/week',
          'Flexibility, stability & core strength.', Icons.self_improvement,
          const Color(0xFF00D4AA)),
      _PlanData('Full Body Power', '8 weeks · 3×/week',
          'Compound lifts for overall strength.', Icons.fitness_center,
          const Color(0xFFFFB547)),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Workout Plans'),
        actions: [
          IconButton(
            icon: const Icon(Icons.auto_awesome_outlined),
            tooltip: 'Generate AI plan',
            onPressed: () {},
          ),
        ],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: plans.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, i) => _PlanCard(plan: plans[i]),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.auto_awesome),
        label: const Text('Generate with AI'),
      ),
    );
  }
}

class _PlanData {
  const _PlanData(this.title, this.subtitle, this.description, this.icon,
      this.color);
  final String title;
  final String subtitle;
  final String description;
  final IconData icon;
  final Color color;
}

class _PlanCard extends StatelessWidget {
  const _PlanCard({required this.plan});
  final _PlanData plan;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    return Card(
      color: cs.surfaceContainerHighest,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: plan.color.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(plan.icon, color: plan.color, size: 28),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(plan.title,
                        style: tt.titleMedium
                            ?.copyWith(fontWeight: FontWeight.w700)),
                    const SizedBox(height: 2),
                    Text(plan.subtitle,
                        style: TextStyle(
                            color: plan.color,
                            fontSize: 12,
                            fontWeight: FontWeight.w600)),
                    const SizedBox(height: 4),
                    Text(plan.description,
                        style: tt.bodySmall?.copyWith(
                            color: cs.onSurfaceVariant)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right_outlined),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class NutritionPage extends StatelessWidget {
  const NutritionPage({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Nutrition'),
        actions: [
          IconButton(
              icon: const Icon(Icons.camera_alt_outlined), onPressed: () {}),
          IconButton(
              icon: const Icon(Icons.qr_code_scanner), onPressed: () {}),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // ── Macro summary ─────────────────────────────────────────
          Card(
            color: cs.surfaceContainerHighest,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Text('Daily Summary',
                      style: tt.titleMedium
                          ?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 140,
                    child: PieChart(
                      PieChartData(
                        sections: [
                          PieChartSectionData(
                              value: 96,
                              color: const Color(0xFF6C63FF),
                              title: 'Protein\n96g',
                              radius: 50,
                              titleStyle: const TextStyle(fontSize: 11,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                          PieChartSectionData(
                              value: 180,
                              color: const Color(0xFF00D4AA),
                              title: 'Carbs\n180g',
                              radius: 50,
                              titleStyle: const TextStyle(fontSize: 11,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                          PieChartSectionData(
                              value: 55,
                              color: const Color(0xFFFF6B35),
                              title: 'Fat\n55g',
                              radius: 50,
                              titleStyle: const TextStyle(fontSize: 11,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ],
                        sectionsSpace: 3,
                        centerSpaceRadius: 32,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const _CalorieBar(consumed: 1440, target: 2000),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),

          // ── Meal log ───────────────────────────────────────────────
          Text('Today\'s meals',
              style: tt.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          ..._meals.map((m) => _MealCard(meal: m)),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.add),
        label: const Text('Log meal'),
      ),
    );
  }
}

class _CalorieBar extends StatelessWidget {
  const _CalorieBar({required this.consumed, required this.target});
  final int consumed;
  final int target;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final pct = (consumed / target).clamp(0.0, 1.0);

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('$consumed kcal consumed',
                style: const TextStyle(fontWeight: FontWeight.w600)),
            Text('$target kcal goal',
                style: TextStyle(color: cs.onSurfaceVariant, fontSize: 12)),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: pct,
            minHeight: 10,
            color: cs.primary,
            backgroundColor: cs.primary.withOpacity(0.1),
          ),
        ),
      ],
    );
  }
}

class _MealData {
  const _MealData(this.mealTime, this.name, this.calories, this.macros);
  final String mealTime;
  final String name;
  final int calories;
  final String macros;
}

const _meals = [
  _MealData('Breakfast', 'Oatmeal + banana + whey protein', 480,
      'P: 32g  C: 68g  F: 8g'),
  _MealData('Lunch', 'Chicken rice bowl with avocado', 620,
      'P: 45g  C: 72g  F: 18g'),
  _MealData('Snack', 'Greek yogurt + almonds', 340, 'P: 19g  C: 22g  F: 16g'),
];

class _MealCard extends StatelessWidget {
  const _MealCard({required this.meal});
  final _MealData meal;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    return Card(
      color: cs.surfaceContainerHighest,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: cs.secondary.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(Icons.restaurant, color: cs.secondary),
        ),
        title: Text(meal.name,
            style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(meal.mealTime,
                style: TextStyle(
                    color: cs.primary,
                    fontSize: 11,
                    fontWeight: FontWeight.w600)),
            Text(meal.macros,
                style: tt.bodySmall?.copyWith(color: cs.onSurfaceVariant)),
          ],
        ),
        trailing: Text('${meal.calories}\nkcal',
            textAlign: TextAlign.right,
            style: const TextStyle(
                fontWeight: FontWeight.w700, fontSize: 13)),
        onTap: () {},
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // ── App bar ──────────────────────────────────────────────────
          SliverAppBar.large(
            title: const Text('FitFlow'),
            actions: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () {},
              ),
              Padding(
                padding: const EdgeInsets.only(right: 12),
                child: CircleAvatar(
                  backgroundColor: cs.primary,
                  child: const Text('K',
                      style: TextStyle(color: Colors.white,
                          fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),

          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // ── Daily rings ───────────────────────────────────────
                _SectionHeader(title: "Today's progress"),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const [
                    _RingCard(label: 'Calories', value: 0.72, display: '1 440',
                        unit: 'kcal', color: Color(0xFF6C63FF)),
                    _RingCard(label: 'Protein', value: 0.6, display: '96',
                        unit: 'g', color: Color(0xFF00D4AA)),
                    _RingCard(label: 'Active', value: 0.45, display: '27',
                        unit: 'min', color: Color(0xFFFF6B35)),
                  ],
                ),
                const SizedBox(height: 24),

                // ── Weekly activity chart ─────────────────────────────
                _SectionHeader(title: 'Weekly activity'),
                const SizedBox(height: 12),
                _WeeklyChart(colorScheme: cs),
                const SizedBox(height: 24),

                // ── Today's plan ──────────────────────────────────────
                _SectionHeader(title: "Today's workout"),
                const SizedBox(height: 12),
                _WorkoutCard(colorScheme: cs, textTheme: tt),
                const SizedBox(height: 24),

                // ── Quick log ─────────────────────────────────────────
                _SectionHeader(title: 'Quick log'),
                const SizedBox(height: 12),
                _QuickLogRow(colorScheme: cs),
                const SizedBox(height: 32),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Supporting widgets ──────────────────────────────────────────────────────

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return Text(title,
        style: Theme.of(context)
            .textTheme
            .titleMedium
            ?.copyWith(fontWeight: FontWeight.w600));
  }
}

class _RingCard extends StatelessWidget {
  const _RingCard({
    required this.label,
    required this.value,
    required this.display,
    required this.unit,
    required this.color,
  });

  final String label;
  final double value;
  final String display;
  final String unit;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      color: cs.surfaceContainerHighest,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            CircularPercentIndicator(
              radius: 40,
              lineWidth: 7,
              percent: value.clamp(0.0, 1.0),
              center: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(display,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 13)),
                  Text(unit,
                      style: TextStyle(fontSize: 10, color: Colors.grey[400])),
                ],
              ),
              progressColor: color,
              backgroundColor: color.withOpacity(0.15),
              circularStrokeCap: CircularStrokeCap.round,
            ),
            const SizedBox(height: 8),
            Text(label,
                style: TextStyle(fontSize: 11, color: Colors.grey[400])),
          ],
        ),
      ),
    );
  }
}

class _WeeklyChart extends StatelessWidget {
  const _WeeklyChart({required this.colorScheme});
  final ColorScheme colorScheme;

  @override
  Widget build(BuildContext context) {
    final barGroups = [
      _bar(0, 0.4), _bar(1, 0.8), _bar(2, 0.5), _bar(3, 1.0),
      _bar(4, 0.6), _bar(5, 0.3), _bar(6, 0.7),
    ];

    return Card(
      color: colorScheme.surfaceContainerHighest,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: SizedBox(
          height: 140,
          child: BarChart(
            BarChartData(
              gridData: const FlGridData(show: false),
              borderData: FlBorderData(show: false),
              titlesData: FlTitlesData(
                leftTitles:
                    const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                rightTitles:
                    const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                topTitles:
                    const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (v, _) => Text(
                      ['M', 'T', 'W', 'T', 'F', 'S', 'S'][v.toInt()],
                      style: TextStyle(
                          fontSize: 11, color: Colors.grey[400]),
                    ),
                  ),
                ),
              ),
              barGroups: barGroups,
            ),
          ),
        ),
      ),
    );
  }

  BarChartGroupData _bar(int x, double y) => BarChartGroupData(
        x: x,
        barRods: [
          BarChartRodData(
            toY: y * 100,
            color: colorScheme.primary,
            width: 18,
            borderRadius: BorderRadius.circular(6),
            backDrawRodData: BackgroundBarChartRodData(
              show: true,
              toY: 100,
              color: colorScheme.primary.withOpacity(0.1),
            ),
          )
        ],
      );
}

class _WorkoutCard extends StatelessWidget {
  const _WorkoutCard(
      {required this.colorScheme, required this.textTheme});

  final ColorScheme colorScheme;
  final TextTheme textTheme;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: colorScheme.primary,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Upper Body Strength',
                      style: textTheme.titleMedium?.copyWith(
                          color: Colors.white, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 4),
                  Text('45 min · 8 exercises',
                      style: TextStyle(
                          color: Colors.white.withOpacity(0.8), fontSize: 13)),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: colorScheme.primary,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10)),
                    ),
                    child: const Text('Start workout'),
                  ),
                ],
              ),
            ),
            const Icon(Icons.fitness_center,
                size: 56, color: Colors.white24),
          ],
        ),
      ),
    );
  }
}

class _QuickLogRow extends StatelessWidget {
  const _QuickLogRow({required this.colorScheme});
  final ColorScheme colorScheme;

  @override
  Widget build(BuildContext context) {
    final items = [
      (Icons.add_circle_outline, 'Log meal'),
      (Icons.camera_alt_outlined, 'Scan food'),
      (Icons.share_outlined, 'Share workout'),
    ];

    return Row(
      children: items.map((item) {
        return Expanded(
          child: Card(
            color: colorScheme.surfaceContainerHighest,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14)),
            child: InkWell(
              onTap: () {},
              borderRadius: BorderRadius.circular(14),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: Column(
                  children: [
                    Icon(item.$1, color: colorScheme.primary),
                    const SizedBox(height: 6),
                    Text(item.$2,
                        style: const TextStyle(fontSize: 11),
                        textAlign: TextAlign.center),
                  ],
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

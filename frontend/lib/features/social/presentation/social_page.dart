import 'package:flutter/material.dart';

class SocialPage extends StatelessWidget {
  const SocialPage({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;

    final posts = [
      _PostData('Alex Kim', 'Crushed leg day! 🦵💪 New PR on squats — 120kg!',
          'Upper Body · 45 min', 42, 8, 'AK', const Color(0xFF6C63FF)),
      _PostData('Priya S.', '5 km run in 22 minutes this morning 🏃‍♀️',
          'Cardio · 22 min', 87, 14, 'PS', const Color(0xFF00D4AA)),
      _PostData('Tom R.', '30-day HIIT challenge complete ✅🎉',
          'HIIT · 35 min', 126, 31, 'TR', const Color(0xFFFF6B35)),
      _PostData('Mia J.', 'Meal prep Sunday! High-protein bowls for the week 🥗',
          'Nutrition log', 55, 12, 'MJ', const Color(0xFFFFB547)),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Community'),
        actions: [
          IconButton(
              icon: const Icon(Icons.emoji_events_outlined), onPressed: () {}),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Challenges bar
          SizedBox(
            height: 90,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: 4,
              separatorBuilder: (_, __) => const SizedBox(width: 10),
              itemBuilder: (ctx, i) {
                final challenges = [
                  ('30-Day Squat', '🏆', const Color(0xFF6C63FF)),
                  ('10K Steps', '🚶', const Color(0xFF00D4AA)),
                  ('No Sugar', '🍎', const Color(0xFFFF6B35)),
                  ('Plank 2 min', '⚡', const Color(0xFFFFB547)),
                ];
                final c = challenges[i];
                return Container(
                  width: 130,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: c.$3.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: c.$3.withOpacity(0.3)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(c.$2, style: const TextStyle(fontSize: 22)),
                      Text(c.$1,
                          style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: c.$3)),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 20),

          Text('Feed', style: tt.titleMedium?.copyWith(
              fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),

          ...posts.map((p) => _PostCard(post: p)),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.share),
        label: const Text('Share workout'),
      ),
    );
  }
}

class _PostData {
  const _PostData(this.author, this.caption, this.activity, this.likes,
      this.comments, this.initials, this.avatarColor);
  final String author;
  final String caption;
  final String activity;
  final int likes;
  final int comments;
  final String initials;
  final Color avatarColor;
}

class _PostCard extends StatefulWidget {
  const _PostCard({required this.post});
  final _PostData post;

  @override
  State<_PostCard> createState() => _PostCardState();
}

class _PostCardState extends State<_PostCard> {
  bool _liked = false;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tt = Theme.of(context).textTheme;
    final p = widget.post;

    return Card(
      color: cs.surfaceContainerHighest,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Author row
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: p.avatarColor,
                  child: Text(p.initials,
                      style: const TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p.author,
                          style: const TextStyle(fontWeight: FontWeight.w700)),
                      Text(p.activity,
                          style: TextStyle(
                              fontSize: 11, color: cs.onSurfaceVariant)),
                    ],
                  ),
                ),
                IconButton(icon: const Icon(Icons.more_horiz), onPressed: () {}),
              ],
            ),
            const SizedBox(height: 10),
            Text(p.caption, style: tt.bodyMedium),
            const SizedBox(height: 12),
            Row(
              children: [
                GestureDetector(
                  onTap: () => setState(() => _liked = !_liked),
                  child: Row(
                    children: [
                      Icon(
                        _liked ? Icons.favorite : Icons.favorite_border,
                        size: 20,
                        color: _liked ? Colors.red : cs.onSurfaceVariant,
                      ),
                      const SizedBox(width: 4),
                      Text('${p.likes + (_liked ? 1 : 0)}',
                          style: TextStyle(
                              fontSize: 13, color: cs.onSurfaceVariant)),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                Icon(Icons.chat_bubble_outline,
                    size: 20, color: cs.onSurfaceVariant),
                const SizedBox(width: 4),
                Text('${p.comments}',
                    style: TextStyle(
                        fontSize: 13, color: cs.onSurfaceVariant)),
                const Spacer(),
                Icon(Icons.share_outlined,
                    size: 20, color: cs.onSurfaceVariant),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

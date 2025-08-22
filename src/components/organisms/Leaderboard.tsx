import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';
import { generateMockLeaderboardUsers, LeaderboardUser } from '../../utils/mockData';
import { Badge } from '../atoms/Badge';

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    setUsers(generateMockLeaderboardUsers(10));
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-400" size={24} />;
    if (rank === 2) return <Trophy className="text-gray-400" size={24} />;
    if (rank === 3) return <Trophy className="text-yellow-600" size={24} />;
    return <span className="font-bold text-lg w-6 text-center">{rank}</span>;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Award size={28} className="text-primary-gold" />
        <h2 className="text-3xl font-bold font-montserrat">Top Shoppers</h2>
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
              user.rank <= 3 ? 'bg-white/10' : ''
            }`}
          >
            <div className="flex-shrink-0">{getRankIcon(user.rank)}</div>
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-montserrat font-semibold">{user.name}</p>
              <Badge variant="default" size="sm" className="capitalize">{user.tier}</Badge>
            </div>
            <div className="flex items-center gap-2 text-primary-gold font-bold">
              <Star size={16} />
              <span>{user.points.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

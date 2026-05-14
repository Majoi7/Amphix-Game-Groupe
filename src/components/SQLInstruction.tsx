import React from 'react';
import { motion } from 'motion/react';
import { Database, Copy, Check } from 'lucide-react';

export default function SQLInstruction({ showToast }: { showToast: (m: string) => void }) {
  const [copied, setCopied] = React.useState(false);

  const sql = `
-- Exécutez ce code dans l'éditeur SQL de Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text,
  status text DEFAULT 'active',
  duration_seconds int,
  categories text,
  validation_code text,
  initial_points int DEFAULT 3,
  groups text,
  start_time timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id uuid REFERENCES sessions(id),
  name text,
  group_name text,
  individual_points int DEFAULT 3,
  group_score int DEFAULT 0,
  started_at timestamp with time zone DEFAULT now(),
  finished_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS answers (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_id uuid REFERENCES players(id),
  question_index int,
  selected_option int,
  is_correct boolean,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

ALTER TABLE sessions ADD COLUMN IF NOT EXISTS validation_code text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS initial_points int DEFAULT 3;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS groups text;

ALTER TABLE players ADD COLUMN IF NOT EXISTS group_name text;
ALTER TABLE players ADD COLUMN IF NOT EXISTS individual_points int DEFAULT 3;
ALTER TABLE players ADD COLUMN IF NOT EXISTS group_score int DEFAULT 0;

-- ACTIVER LE TEMPS RÉEL (REALTIME) POUR DE MEILLEURES PERFORMANCES ET SUPPORTER 100+ JOUEURS
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE sessions, players, answers;
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    showToast('SQL copié !');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-[2rem] p-6 mb-6">
      <h3 className="font-black text-red-600 flex items-center gap-2 mb-2">
        <Database className="w-6 h-6" />
        MISE À JOUR BASE DE DONNÉES REQUISE
      </h3>
      <p className="text-red-800 text-sm font-bold mb-4">
        Pour que les nouvelles fonctionnalités de groupes et de points fonctionnent, vous devez ajouter ces colonnes à vos tables dans Supabase. Ce message disparaîtra une fois les colonnes créées si tout fonctionne.
      </p>
      <div className="relative">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto font-mono">
          {sql}
        </pre>
        <button 
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function Home() {
const [AnimationStyle, setAnimationStyle] = useState('');
const [EpisodeLogline, setEpisodeLogline] = useState('');
const [TargetAgeGroup, setTargetAgeGroup] = useState('');
const [Runtime, setRuntime] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animation_style, episode_logline, target_age_group, runtime }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(e: any) { setOutput('Error: ' + e.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Animation Storyboard Generator</h1>
          <p className="text-gray-400 mb-8">Generate storyboard sequences with shot descriptions.</p>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div><label className="block text-sm text-gray-400 mb-1">Animation Style</label><input value={AnimationStyle} onChange={e=>setAnimationStyle(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter animation style..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Episode Logline</label><input value={EpisodeLogline} onChange={e=>setEpisodeLogline(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter episode logline..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Target Age Group</label><input value={TargetAgeGroup} onChange={e=>setTargetAgeGroup(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter target age group..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Runtime</label><input value={Runtime} onChange={e=>setRuntime(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter runtime..." /></div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 transition-opacity"
              style={backgroundColor: 'hsl(220,60%,55%)'}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-200">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
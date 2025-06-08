import React, { useState, useEffect } from 'react';
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import GoogleMaps from "@/components/Maps/GoogleMaps";
import PhoneCard from "@/components/phone/phoneCards";
import { debugDashboard, testApiConnection } from "@/utils/debug";

const SimpleDashboard = () => {
  const [testComponent, setTestComponent] = useState('basic');
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    // Run debug check on mount
    const info = debugDashboard();
    setDebugInfo(info);

    // Test API connection
    testApiConnection().then(result => {
      console.log('API Test Result:', result);
    });
  }, []);

  const renderTestComponent = () => {
    switch (testComponent) {
      case 'stats':
        return <DashboardStats />;
      case 'actions':
        return <QuickActions />;
      case 'activity':
        return <RecentActivity />;
      case 'maps':
        return (
          <div className="h-[400px]">
            <GoogleMaps />
          </div>
        );
      case 'phones':
        return <PhoneCard />;
      default:
        return (
          <GlassCard className="p-6" variant="secondary">
            <h2 className="text-xl font-semibold text-white mb-4">
              Basic Test - All Good!
            </h2>
            <p className="text-white/70">
              Click the buttons above to test individual components.
            </p>
          </GlassCard>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="dashboard" />

      <div className="relative z-10 p-6 space-y-6">
        {/* Test Header */}
        <GlassCard className="p-6" variant="primary">
          <h1 className="text-3xl font-bold text-white">
            Dashboard Debug - <span className="text-neon-cyan">Testing Components</span>
          </h1>
          <p className="text-white/70 mt-2">
            Test individual components to find the issue.
          </p>

          {/* Component Test Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { key: 'basic', label: 'Basic' },
              { key: 'stats', label: 'Stats' },
              { key: 'actions', label: 'Actions' },
              { key: 'activity', label: 'Activity' },
              { key: 'maps', label: 'Maps' },
              { key: 'phones', label: 'Phones' },
            ].map((test) => (
              <button
                key={test.key}
                onClick={() => setTestComponent(test.key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  testComponent === test.key
                    ? 'bg-neon-cyan text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {test.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Test Component Area */}
        <div className="min-h-[400px]">
          {renderTestComponent()}
        </div>

        {/* Debug Info */}
        <GlassCard className="p-4" variant="dark">
          <h3 className="text-lg font-semibold text-white mb-2">Debug Info</h3>
          <div className="text-sm text-white/70 space-y-1">
            <p>Current Test: <span className="text-neon-cyan">{testComponent}</span></p>
            {debugInfo && (
              <>
                <p>User ID: <span className="text-neon-cyan">{debugInfo.environment.userId || 'Not found'}</span></p>
                <p>Token: <span className="text-neon-cyan">{debugInfo.environment.token ? 'Present' : 'Missing'}</span></p>
                <p>API URL: <span className="text-neon-cyan">{debugInfo.environment.apiUrl || 'Not set'}</span></p>
                <p>Authenticated: <span className={debugInfo.isAuthenticated ? 'text-green-400' : 'text-red-400'}>
                  {debugInfo.isAuthenticated ? 'Yes' : 'No'}
                </span></p>
                <p>API Configured: <span className={debugInfo.apiConfigured ? 'text-green-400' : 'text-red-400'}>
                  {debugInfo.apiConfigured ? 'Yes' : 'No'}
                </span></p>
                <p>Maps Configured: <span className={debugInfo.mapsConfigured ? 'text-green-400' : 'text-red-400'}>
                  {debugInfo.mapsConfigured ? 'Yes' : 'No'}
                </span></p>
              </>
            )}
          </div>

          <button
            onClick={() => {
              const info = debugDashboard();
              setDebugInfo(info);
            }}
            className="mt-3 px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan rounded-lg text-xs hover:bg-neon-cyan/30 transition-colors"
          >
            Refresh Debug Info
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default SimpleDashboard;

import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Database,
  Link,
  Activity,
  CheckCircle,
  AlertTriangle,
  Lock,
  Search,
  RefreshCw,
} from 'lucide-react';

export const CybersecurityMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'neural' | 'blockchain'>('memory');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedHash, setVerifiedHash] = useState<boolean>(true);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedHash(true);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#0A0A0E] rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl font-mono text-xs">
      {/* Chrome Header */}
      <div className="bg-[#12111A] px-4 py-2.5 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] text-[#A78BFA] font-bold tracking-wider hidden sm:inline">
            CORE-FORENSICS-AI // LIVE MEMORY SENTRY
          </span>
        </div>

        {/* Development Status Badge - Prominently Displayed */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[10px] uppercase tracking-wider animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Status: IN PROGRESS / RESEARCH PHASE</span>
        </div>

        <div className="text-[11px] text-[#929BA5] hidden md:block">
          SHA-256 Ledger: Block #49281
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#0D0B14] to-[#0A0A0E] text-[#D7E2EA]">
        {/* Top Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-[10px] text-[#929BA5] uppercase">Volatile Memory Pool</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>16.0 GB Live RAM</span>
            </div>
            <span className="text-[10px] text-emerald-400">Non-Invasive Dump OK</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-[10px] text-[#929BA5] uppercase">Process Artifacts</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>184 Processes / 1,420 DLLs</span>
            </div>
            <span className="text-[10px] text-cyan-400">Memory Unmapped &amp; Extracted</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-[10px] text-[#929BA5] uppercase">Deep Learning Classifier</div>
            <div className="text-sm font-bold text-red-400 mt-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>Threat Score: 0.942</span>
            </div>
            <span className="text-[10px] text-red-400">Injected Shellcode Detected</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-[10px] text-[#929BA5] uppercase">Blockchain Ledger</div>
            <div className="text-sm font-bold text-purple-300 mt-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>SHA-256 Anchored</span>
            </div>
            <span className="text-[10px] text-purple-400">Chain of Custody Intact</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'memory'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                : 'text-[#929BA5] hover:text-white'
            }`}
          >
            1. Volatile Memory &amp; Processes
          </button>
          <button
            onClick={() => setActiveTab('neural')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'neural'
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                : 'text-[#929BA5] hover:text-white'
            }`}
          >
            2. Deep Learning Inference
          </button>
          <button
            onClick={() => setActiveTab('blockchain')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'blockchain'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                : 'text-[#929BA5] hover:text-white'
            }`}
          >
            3. Blockchain Verification
          </button>
        </div>

        {/* Tab 1: Memory Inspection */}
        {activeTab === 'memory' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-[#929BA5]">Extracted Volatile Memory Artifacts (Windows x64 Kernel)</span>
              <span className="text-purple-400">Parsing Rate: 420 MB/s</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-300 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>PID 4892 • svchost.exe (Hollowed Process)</span>
                  </div>
                  <div className="text-[10px] text-[#929BA5] mt-0.5">
                    Anomalous RWX memory page detected without backing file on disk. Shellcode payload in VAD tree.
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px]">
                  MALICIOUS (94.2%)
                </span>
              </div>

              <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PID 1044 • lsass.exe (Local Security Authority)</span>
                  </div>
                  <div className="text-[10px] text-[#929BA5] mt-0.5">
                    Valid digital signature; no suspicious DLL injection or memory hook identified.
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  BENIGN
                </span>
              </div>

              <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PID 2940 • explorer.exe (Desktop Shell)</span>
                  </div>
                  <div className="text-[10px] text-[#929BA5] mt-0.5">
                    Standard thread pool; stack pointers verified against kernel baseline.
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  BENIGN
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Neural Inference */}
        {activeTab === 'neural' && (
          <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Deep Behavioral Classification Network</span>
              <span className="text-[11px] text-blue-400">Architecture: Multi-Layer Bi-LSTM + Attention</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Fileless Threat Probability (Reflective DLL / Process Hollowing)</span>
                  <span className="text-red-400 font-bold">94.2%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-red-500 w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Benign Execution Probability</span>
                  <span className="text-emerald-400 font-bold">5.8%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[6%]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#929BA5] italic">
              Features extracted: Injected thread entropy, API unhooking calls, VirtualAlloc permissions, and heap execution flags.
            </p>
          </div>
        )}

        {/* Tab 3: Blockchain Evidence Ledger */}
        {activeTab === 'blockchain' && (
          <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">Tamper-Proof Evidence Vault</span>
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600/50 transition-all"
              >
                <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>Verify Chain Hash</span>
              </button>
            </div>

            <div className="p-3 rounded bg-purple-950/20 border border-purple-500/30 text-[11px] space-y-1">
              <div>
                <span className="text-[#929BA5]">Evidence ID: </span>
                <span className="text-white font-bold">EV-2026-RAM-0881</span>
              </div>
              <div>
                <span className="text-[#929BA5]">SHA-256 Hash: </span>
                <span className="text-cyan-300 font-mono break-all">
                  8f49b1a0e3c84f67c29e12089b3d11a76c0245e3d7894a91b2c4e5f6a7b8c9d0
                </span>
              </div>
              <div>
                <span className="text-[#929BA5]">Timestamp: </span>
                <span className="text-amber-300">1783084920 (UTC Verified)</span>
              </div>
              <div>
                <span className="text-[#929BA5]">Chain State: </span>
                <span className="text-emerald-400 font-bold">
                  Immutable • 12 Confirmations • Verified Authentic
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

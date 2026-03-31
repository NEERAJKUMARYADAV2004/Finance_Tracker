import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { User, LogOut, Shield, Download, Upload, Trash2, KeyRound } from 'lucide-react';

export function Profile() {
  const { user, signOut, pinCode, setPinCode } = useAuthStore();
  const [newPin, setNewPin] = useState('');

  const handleSetPin = () => {
    if (newPin.length === 4) {
      setPinCode(newPin);
      setNewPin('');
    }
  };

  const handleRemovePin = () => {
    setPinCode(null);
  };

  const handleExport = () => {
    const data = localStorage.getItem('expense-storage');
    if (!data) {
      alert("No data available to export.");
      return;
    }
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance-tracker-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target.result;
        const json = JSON.parse(result);
        
        // Ensure its a valid Zustand persist snapshot
        if (json.state && Array.isArray(json.state.expenses)) {
          localStorage.setItem('expense-storage', result);
          alert('Data successfully imported. The app will quickly reload to apply state.');
          window.location.reload();
        } else {
          alert('Invalid JSON structure. Ensure you selected a finance-tracker-backup.json file.');
        }
      } catch (err) {
        alert('Failed to parse file. Corrupted JSON data.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset the input after load
  };

  const handleErase = () => {
    if (window.confirm("Are you incredibly sure you want to erase all data permanently?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-primary">Profile</h1>
        <p className="text-secondary text-sm">Manage your offline identity</p>
      </header>

      {/* User Info Card */}
      <Card className="flex items-center gap-4 p-5">
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
          <User className="w-7 h-7 text-gold stroke-[1.5px]" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-primary">{user?.name || 'Local User'}</h2>
          <p className="text-sm text-secondary">{user?.email}</p>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
            <Shield className="w-3 h-3" />
            <span>100% Offline Storage</span>
          </div>
        </div>
      </Card>

      {/* Security Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider ml-1">Security</h3>
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <KeyRound className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-primary font-medium">App Lock PIN</p>
                <p className="text-xs text-secondary">{pinCode ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            {pinCode ? (
              <Button variant="outline" size="sm" onClick={handleRemovePin}>Remove</Button>
            ) : (
              <div className="flex items-center gap-2">
                <input 
                  type="password" 
                  maxLength={4} 
                  placeholder="0000" 
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                  className="app-input w-16 px-2 py-1 text-center"
                />
                <Button variant="secondary" size="sm" disabled={newPin.length !== 4} onClick={handleSetPin}>Set</Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Data Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider ml-1">Data Management</h3>
        <Card className="flex flex-col gap-2 relative">
          
          <Button variant="ghost" className="justify-start" icon={Download} onClick={handleExport}>
            Export Data (JSON)
          </Button>

          <Button 
            variant="ghost" 
            className="justify-start" 
            icon={Upload} 
            onClick={() => document.getElementById('json-upload-input').click()}
          >
            Import Data (JSON)
          </Button>
          <input 
            id="json-upload-input" 
            type="file" 
            accept=".json" 
            className="hidden" 
            onChange={handleImport}
          />

          <Button variant="ghost" className="justify-start text-red-400 hover:text-red-300" icon={Trash2} onClick={handleErase}>
            Erase All Local Data
          </Button>

        </Card>
      </div>

      <div className="mt-8">
        <Button variant="danger" className="w-full" icon={LogOut} onClick={signOut}>
          Sign Out & Lock App
        </Button>
      </div>
    </div>
  );
}

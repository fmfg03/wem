
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, DatabaseIcon } from 'lucide-react';
import { testMediaConnection } from '@/services/media/mediaQueries';

interface MediaActionsProps {
  connectionStatus: 'testing' | 'connected' | 'disconnected' | 'unknown';
  isSyncing: boolean;
  onSyncWithStorage: () => Promise<void>;
  onTestConnection: () => Promise<void>;
}

const MediaActions: React.FC<MediaActionsProps> = ({
  connectionStatus,
  isSyncing,
  onSyncWithStorage,
  onTestConnection
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onTestConnection} 
        variant="outline"
        className="flex items-center gap-2"
        disabled={connectionStatus === 'testing'}
      >
        {connectionStatus === 'connected' || connectionStatus === 'testing' ? 
          <DatabaseIcon size={18} className="text-green-500" /> : 
          <DatabaseIcon size={18} className="text-red-500" />
        }
        <span>Probar Conexión</span>
      </Button>
      
      <Button 
        onClick={onSyncWithStorage}
        variant="outline"
        disabled={isSyncing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
        {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
      </Button>
    </div>
  );
};

export default MediaActions;

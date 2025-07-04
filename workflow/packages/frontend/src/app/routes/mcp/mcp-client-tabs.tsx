import { ReloadIcon } from '@radix-ui/react-icons';
import { t } from 'i18next';
import { AlertTriangle, ChevronDown, ChevronUp, Copy, Eye, EyeOff, Link as LinkIcon, RefreshCw, Server, Zap } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import claude from '@/assets/img/custom/claude.svg';
import cursor from '@/assets/img/custom/cursor.svg';
import windsurf from '@/assets/img/custom/windsurf.svg';
import { useTheme } from '@/components/theme-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

import { SimpleJsonViewer } from '../../../components/simple-json-viewer';

type McpClientTabsProps = {
  mcpServerUrl: string;
  hasTools?: boolean; // Whether there are any connection or flow tools
  onRotateToken?: () => void;
  isRotating?: boolean;
  hasValidMcp?: boolean;
};

const NODE_JS_DOWNLOAD_URL = 'https://nodejs.org/en/download';

// Utility function to mask token in URL
const maskToken = (url: string) => {
  return url.replace(/\/([^/]+)\/sse$/, '/•••••••••••••••••••••/sse');
};

// Define type for ButtonWithTooltip props
type ButtonWithTooltipProps = {
  tooltip: string;
  onClick: (e?: React.MouseEvent) => void;
  variant?: 'ghost' | 'outline' | 'default' | 'destructive' | 'secondary' | 'link';
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

// Reusable ButtonWithTooltip component
const ButtonWithTooltip = ({ tooltip, onClick, variant = 'ghost', icon, className = 'h-7 w-7', disabled = false }: ButtonWithTooltipProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size="icon" className={className} onClick={onClick} disabled={disabled}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ConfigDisplay = ({
  mcpServerUrl,
  type,
  onRotateToken,
  isRotating = false,
  hasValidMcp = false,
}: {
  mcpServerUrl: string;
  type: 'npx' | 'url';
  onRotateToken?: () => void;
  isRotating?: boolean;
  hasValidMcp?: boolean;
}) => {
  const { toast } = useToast();
  const [showToken, setShowToken] = useState(false);

  const toggleTokenVisibility = () => setShowToken(!showToken);
  const maskedUrl = showToken ? mcpServerUrl : maskToken(mcpServerUrl);

  return (
    <div className="space-y-2">
      <div className="rounded-md border overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b bg-background">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('Server Configuration')}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-1 text-xs border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800/50 px-1.5 py-0.5 rounded-sm">
                      <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      <span className="text-red-600 dark:text-red-400 font-medium">{t('Security')}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{t('This URL grants access to your tools and data. Only share with trusted applications.')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex gap-2">
            <ButtonWithTooltip
              tooltip={showToken ? t('Hide sensitive data') : t('Show sensitive data')}
              onClick={toggleTokenVisibility}
              variant="outline"
              icon={showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            />

            {onRotateToken && (
              <ButtonWithTooltip
                tooltip={t('Create a new URL. The current one will stop working.')}
                onClick={onRotateToken}
                variant="outline"
                disabled={isRotating || !hasValidMcp}
                icon={isRotating ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              />
            )}

            <ButtonWithTooltip
              tooltip={t('Copy configuration')}
              onClick={(e) => {
                e?.stopPropagation();
                const config = {
                  mcpServers: {
                    AIxBlock:
                      type === 'npx'
                        ? {
                            command: 'npx',
                            args: ['-y', 'supergateway', '--sse', 'mcp-remote', maskedUrl, '--allow-http'],
                          }
                        : {
                            url: mcpServerUrl,
                          },
                  },
                };
                navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                toast({
                  description: t('Configuration copied to clipboard'),
                  duration: 3000,
                });
              }}
              variant="outline"
              icon={<Copy className="h-4 w-4" />}
            />
          </div>
        </div>
        <div className="bg-background">
          <SimpleJsonViewer
            hideCopyButton={true}
            data={{
              mcpServers: {
                AIxBlock:
                  type === 'npx'
                    ? {
                        command: 'npx',
                        args: ['-y', 'supergateway', '--sse', 'mcp-remote', maskedUrl, '--allow-http'],
                      }
                    : {
                        url: maskedUrl,
                      },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const McpClientTabs = ({ mcpServerUrl, hasTools = false, onRotateToken, isRotating = false, hasValidMcp = false }: McpClientTabsProps) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('claude');
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();

  const toggleTokenVisibility = useCallback(
    () => setShowToken(!showToken),
    [showToken],
  );
  const maskedServerUrl = showToken ? mcpServerUrl : maskToken(mcpServerUrl);

  const tabs = [
    {
      id: 'claude',
      label: t('Claude'),
      icon: claude,
      isImage: true,
    },
    {
      id: 'cursor',
      label: t('Cursor'),
      icon: cursor,
      isImage: true,
    },
    {
      id: 'windsurf',
      label: t('Windsurf'),
      icon: windsurf,
      isImage: true,
    },
    {
      id: 'server',
      label: t('Server/Other'),
      icon: Server,
      isImage: false,
    },
  ];

  const tabClaude = useMemo(() => {
    return (
      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <ConfigDisplay mcpServerUrl={mcpServerUrl} type="npx" onRotateToken={onRotateToken} isRotating={isRotating} hasValidMcp={hasValidMcp} />
        <div>
          <Alert variant="warning">
            <AlertDescription className="text-sm">
              <p>
                {t('Note: MCPs only work with')}{' '}
                <Link to="https://claude.ai/download" className="underline" target="_blank">
                  {t('Claude Desktop')}
                </Link>
                {t(', not the web version.')}
              </p>
            </AlertDescription>
          </Alert>
          <ol className="list-decimal list-inside space-y-3 text-sm text-foreground mt-4">
            <li>
              <span className="font-semibold">{t('Prerequisites:')}</span> {t('Install')}{' '}
              <Link to={NODE_JS_DOWNLOAD_URL} className="underline" target="_blank">
                {t('Node.js')}
              </Link>{' '}
              {t('and')}{' '}
              <Link to="https://claude.ai/download" className="underline" target="_blank">
                {t('Claude Desktop')}
              </Link>
            </li>
            <li>
              <span className="font-semibold">{t('Open Settings:')}</span> {t('Click the menu and select')} <strong>{t('Settings')}</strong> →{' '}
              <strong>{t('Developer')}</strong>
            </li>
            <li>
              <span className="font-semibold">{t('Configure MCP:')}</span> {t('Click')} <strong>{t('Edit Config')}</strong>{' '}
              {t('and paste the configuration below')}
            </li>
            <li>
              <span className="font-semibold">{t('Save and Restart:')}</span> {t('Save the config and restart Claude Desktop')}
            </li>
          </ol>
        </div>
      </div>
    );
  }, [hasValidMcp, isRotating, mcpServerUrl, onRotateToken]);

  const tabCursor = useMemo(() => {
    return (
      <div className="space-y-4 grid grid-cols-2 grid-rows-1 gap-4">
        <ConfigDisplay mcpServerUrl={mcpServerUrl} type="url" onRotateToken={onRotateToken} isRotating={isRotating} hasValidMcp={hasValidMcp} />
        <ol className="list-decimal list-inside space-y-3 text-sm text-foreground mb-4">
          <li>
            <span className="font-semibold">{t('Open Settings:')}</span> {t('Navigate to')} <strong>{t('Settings')}</strong> →{' '}
            <strong>{t('Cursor Settings')}</strong> → <strong>{t('MCP')}</strong>
          </li>
          <li>
            <span className="font-semibold">{t('Add Server:')}</span> {t('Click')} <strong>{t('Add new global MCP server')}</strong>
          </li>
          <li>
            <span className="font-semibold">{t('Configure:')}</span> {t('Paste the configuration below and save')}
          </li>
        </ol>
      </div>
    );
  }, [hasValidMcp, isRotating, mcpServerUrl, onRotateToken]);

  const tabWindsurf = useMemo(() => {
    return (
      <div className="space-y-4 grid grid-cols-2 grid-rows-1 gap-4">
        <ConfigDisplay mcpServerUrl={mcpServerUrl} type="npx" onRotateToken={onRotateToken} isRotating={isRotating} hasValidMcp={hasValidMcp} />
        <ol className="list-decimal list-inside space-y-3 text-sm text-foreground mb-4">
          <li>
            <span className="font-semibold">{t('Open Settings:')}</span> {t('Use either method:')}
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                {t('Go to')} <strong>{t('Windsurf')}</strong> → <strong>{t('Settings')}</strong> → <strong>{t('Advanced Settings')}</strong>
              </li>
              <li>
                {t('Open Command Palette and select')} <strong>{t('Windsurf Settings Page')}</strong>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">{t('Navigate to Cascade:')}</span> {t('Select')} <strong>{t('Cascade')}</strong> {t('in the sidebar')}
          </li>
          <li>
            <span className="font-semibold">{t('Add Server:')}</span> {t('Click')} <strong>{t('Add Server')}</strong> →{' '}
            <strong>{t('Add custom server +')}</strong>
          </li>
          <li>
            <span className="font-semibold">{t('Configure:')}</span> {t('Paste the configuration below and save')}
          </li>
        </ol>
      </div>
    );
  }, [hasValidMcp, isRotating, mcpServerUrl, onRotateToken]);

  const tabServer = useMemo(() => {
    return (
      <div className="space-y-4">
        <div className="space-y-3 w-full">
          <div className="flex items-center gap-2 mb-1">
            <LinkIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">{t('Server URL')}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-1 text-xs border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800/50 px-1.5 py-0.5 rounded-sm">
                      <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                      <span className="text-red-600 dark:text-red-400 font-medium">{t('Security')}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{t('This URL grants access to your tools and data. Only share with trusted applications.')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`font-mono ${
                  theme === 'dark' ? 'bg-muted text-foreground' : 'bg-muted/30 text-foreground/90'
                } cursor-text w-full border rounded-md px-3 py-2.5 text-sm overflow-x-auto`}
              >
                {maskedServerUrl}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <ButtonWithTooltip
                  tooltip={showToken ? t('Hide sensitive data') : t('Show sensitive data')}
                  onClick={toggleTokenVisibility}
                  variant="outline"
                  className="h-9 w-9"
                  icon={showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                />
                <ButtonWithTooltip
                  tooltip={t('Create a new URL. The current one will stop working.')}
                  onClick={onRotateToken ? onRotateToken : () => {}}
                  variant="outline"
                  className="h-9 w-9"
                  disabled={isRotating || !hasValidMcp}
                  icon={isRotating ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                />
                <ButtonWithTooltip
                  tooltip={t('Copy URL')}
                  onClick={() => {
                    navigator.clipboard.writeText(mcpServerUrl);
                    toast({
                      description: t('URL copied to clipboard'),
                      duration: 3000,
                    });
                  }}
                  variant="outline"
                  className="h-9 w-9"
                  icon={<Copy className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    hasValidMcp,
    isRotating,
    maskedServerUrl,
    mcpServerUrl,
    onRotateToken,
    showToken,
    theme,
    toast,
    toggleTokenVisibility,
  ]);

  const tabContents = useMemo(() => {
    switch (activeTab) {
      case 'claude':
        return tabClaude;
      case 'cursor':
        return tabCursor;
      case 'windsurf':
        return tabWindsurf;
      case 'server':
        return tabServer;
      default:
        return null;
    }
  }, [activeTab, tabClaude, tabCursor, tabServer, tabWindsurf]);

  return (
    <Card className={`mb-8 ${theme === 'dark' ? 'bg-card border-none' : 'border-none'} shadow-none mb-0`}>
      <CardContent className="p-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={'outline'}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id ? (theme === 'dark' ? 'bg-muted' : 'bg-gray-700 text-white') : theme === 'dark' ? 'bg-card/50' : 'bg-[#f7f6f4]'
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from firing
                  setActiveTab(tab.id);
                }}
              >
                {tab.isImage ? (
                  <img src={tab.icon as string} alt={`${t(tab.label)} ${t('icon')}`} className="w-4 h-4" />
                ) : (
                  <tab.icon className="h-4 w-4" />
                )}
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="p-1" onClick={(e) => e.stopPropagation()}>
            {tabContents}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

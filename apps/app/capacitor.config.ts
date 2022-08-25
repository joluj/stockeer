import { CapacitorConfig } from '@capacitor/cli';
import * as os from 'os';

const url =
  process.env['DEV_SERVER_URL'] ??
  (() => {
    // Just some hacky script that chooses the first 'valid' ip.
    // Not really robust since it can be overwritten via env var.
    const networks = os.networkInterfaces();
    for (const network of Object.values(networks)) {
      if (!network) continue;
      const address = network[0]?.address ?? '';
      if (address != '127.0.0.1') return `http://${address ?? ''}:4498/`;
    }
    return '';
  })();

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app',
  webDir: '../../dist/apps/app',
  bundledWebRuntime: false,
  server: {
    url,
    cleartext: true,
  },
};

if (process.env['BUILD_PRODUCTION']) {
  delete config.server;
}

export default config;

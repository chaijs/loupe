import { esbuildPlugin } from '@web/dev-server-esbuild'
import { playwrightLauncher } from '@web/test-runner-playwright'

export default {
  browsers: [playwrightLauncher({ product: 'chromium' }), playwrightLauncher({ product: 'firefox' })],
  files: ['test/*', '!test/deno.*.ts'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true, target: 'es2020' })],
}

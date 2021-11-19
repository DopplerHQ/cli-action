const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');
const { execSync } = require('child_process');

const workspace = process.env.GITHUB_WORKSPACE;
const binDir = `${workspace}/bin`;

run().catch(error => {
  core.setFailed(error.message);
})

async function run() {
  switch (process.platform) {
    case "win32": {
      const url = 'https://cli.doppler.com/download?os=windows&arch=amd64&format=zip';
      await installZip(binDir, url);
      break;
    }
    case "linux":
    case "darwin": {
      await executeInstallSh(binDir)
      break;
    }
    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
}

async function installZip(path, url) {
  await io.mkdirP(path);
  const downloadPath = await tc.downloadTool(url);
  await tc.extractZip(downloadPath, path);
  core.addPath(path);
}

async function executeInstallSh(installPath) {
  // download script
  const url = "https://cli.doppler.com/install.sh";
  const downloadPath = await tc.downloadTool(url);
  execSync(`chmod +x ${downloadPath}`);

  // execute script
  await io.mkdirP(installPath);
  const installCommand = `${downloadPath} --debug --no-package-manager --install-path ${installPath}`
  stdout = execSync(installCommand, { timeout: 30000 });
  console.log(Buffer.from(stdout).toString("utf-8"))

  // add binary to PATH
  core.addPath(installPath);
}

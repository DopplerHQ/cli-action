const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

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
    case "linux": {
      const url = "https://cli.doppler.com/download?os=linux&arch=amd64&format=tar";
      await installTar(binDir, url);
      break;
    }
    case "darwin": {
      const url = "https://cli.doppler.com/download?os=macos&arch=amd64&format=tar";
      await installTar(binDir, url);
      break;
    }
    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
}

async function installTar(path, url) {
  await io.mkdirP(path);
  const downloadPath = await tc.downloadTool(url);
  await tc.extractTar(downloadPath, path);
  core.addPath(path);
}

async function installZip(path, url) {
  await io.mkdirP(path);
  const downloadPath = await tc.downloadTool(url);
  await tc.extractZip(downloadPath, path);
  core.addPath(path);
}

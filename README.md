# Install Doppler CLI action

The [Doppler CLI](https://github.com/DopplerHQ/cli) is the official tool for interacting with your Enclave secrets and configuration. This action installs the latest Doppler CLI into your PATH.

## Example usage

Include this Action as a step in your workflow:

```
uses: dopplerhq/cli-action@v3
```

You can see a live example of this Action [here](https://github.com/DopplerHQ/cli/blob/master/.github/workflows/cli-action.yml).

## Configuration

In most cases, you'll need to provide the CLI with an auth token. You can do so via the `DOPPLER_TOKEN` environment variable. In the below example, the token is retrieved from [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

```yaml
name: Example action

on: [push]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Install CLI
        uses: dopplerhq/cli-action@v3
      - name: Do something with the CLI
        run: doppler secrets --only-names
        env:
          DOPPLER_TOKEN: ${{ secrets.DOPPLER_TOKEN }}
```

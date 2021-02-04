# Khaos Update Cap

update cap of DEV Protocol

## Deployment

When the function is ready, build the source code with the following command.

```bash
yarn build
```

A subdirectory named `bundled` is added to this directory, and `bundled/index.js` is generated.

Then add `bundled/index.js` to IPFS. You can add files to IPFS node provided by Infura using the following command. (Use curl)

```bash
yarn deploy

> {"Name":"index.js","Hash":"IPFS_HASH_FOR_FILE","Size":"554"}
> {"Name":"","Hash":"IPFS_HASH_FOR_DIRECTORY","Size":"609"}
```

Your function has been deployed!

Submit the `IPFS_HASH_FOR_DIRECTORY` part to [Khaos Registry](https://github.com/dev-protocol/khaos-registry).

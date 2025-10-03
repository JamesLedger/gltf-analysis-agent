# gltf agent analysis

The goal of this project is to have a ui that a user can get information about their uploaded file from.

Data flow:

- user uploads file
- file lands in s3, triggers lambda
- lambda triggers step function
- step function runs analysis on the file using gltf-transform
- ai summarisies the report
- the report is given back to the user

## Get it running

First make sure you're in a terminal authed with aws creds

Run the following commands:

```
pnpm i
pnpm exec sst dev
```

Open localhost:3000 and drop a glb in the dropzone.
You can then go into the step functions UI to see it processing

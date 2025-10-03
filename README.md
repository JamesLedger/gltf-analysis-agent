# gltf agent analysis

The goal of this project is to have a ui that a user can get information about their uploaded file from.

Data flow:

- user uploads file
- file lands in s3, triggers lambda
- lambda triggers step function
- step function runs analysis on the file using gltf-transform
- ai summarisies the report
- the report is given back to the user

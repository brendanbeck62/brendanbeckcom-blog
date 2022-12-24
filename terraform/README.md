# Terrafrom boilerplate

Simple repo that handles setting up terraform remote state

## Things to change
- main.tf
    - s3 bucket name
    - s3 dynamodb_table
- interface.tf
    - prefix
- remote_state/interface.tf
    - prefix

## tf commands

in `/remote_state`:
```
terraform init
terraform plan
terraform apply
```
in `/`:
```
terraform init
terraform play
terraform apply
```

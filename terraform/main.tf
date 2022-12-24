terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  backend "s3" {
    bucket         = "bbcom-blog-remote-state"
    encrypt        = true
    dynamodb_table = "bbcom-blog-remote-state-lock"
    key            = "terraform.tfstate"
    region         = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"
}

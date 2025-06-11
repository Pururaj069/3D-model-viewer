terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source              = "./modules/VPC"
  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidr  = "10.0.1.0/24"
  private_subnet_cidr = "10.0.2.0/24"
  availability_zone   = "us-east-1a"
}

module "sg" {
  source  = "./modules/SG"
  vpc_id  = module.vpc.vpc_id
}

module "ec2_public" {
  source             = "./modules/EC2"

  ec2_instance_name  = "frontend-Instance"
  ami_id             = var.ami
  instance_type      = "t2.medium"
  subnet_id          = module.vpc.public_subnet_id
  key_name           = var.key_name
  security_group_id = module.sg.public_sg_id
  associate_public_ip_address = true
}

module "ec2_private" {
  source             = "./modules/EC2"

  ec2_instance_name  = "backend-Instance"
  ami_id             = var.ami
  instance_type      = "t2.micro"
  subnet_id          = module.vpc.private_subnet_id
  key_name           = var.key_name
  security_group_id = module.sg.private_sg_id
  associate_public_ip_address = false
}

variable "ec2_instance_name" {
    description = "Name of the EC2 instance"
    type        = string
}

variable "ami_id" { 
    description = "AMI ID for the EC2 instance"
    type        = string
    default     = "ami-0953476d60561c955"  # Replace with a valid AMI ID
  
}

variable "instance_type" {
    description = "Instance type for the EC2 instance"
    type        = string
    default     = "t2.micro"
}

variable "key_name" {
    description = "Key pair name for the EC2 instance"
    type        = string
    default     = "aws-key"  # Replace with your key pair name
}       

variable "region" {
    description = "AWS region for the EC2 instance"
    type        = string
    default     = "us-east-1"  # Replace with your desired region
  
}


variable "associate_public_ip_address" {
    description = "Whether to associate a public IP address with the EC2 instance"
    type        = bool
    default     = true  # Set to true if you want the instance to have a public IP
  
}

variable "subnet_id" {
    description = "Subnet ID for the EC2 instance"
    type        = string
    default     = ""  # Replace with your subnet ID if needed
  
}



variable "security_group_id" {
  description = "The security group ID to associate with the EC2 instance"
  type        = string
}
# 🌐 3D Model Viewer Web App with AWS, Docker, and Terraform 🚀

A full-stack web application that displays interactive 3D models, hosted securely on AWS using a scalable and modern architecture. The app features a React frontend, a Node.js backend API, Docker containerization, and infrastructure provisioned entirely using Terraform.

---

## 📸 Project Preview

<!-- Add demo screenshots or GIFs here -->
![Architecture ](./images/react3d.svg)
![3D Model Interaction](./images/3dmodel.png)
![3D Model Frontend](./images/front.png)

## 🧩 Project Architecture

**Frontend**  
- Built with React  
- Dockerized and served via **Nginx**  
- Hosted on a **public EC2 instance**  
- Uses `/api/models` endpoint to fetch model metadata from backend

**Backend**  
- Built with Node.js + Express  
- Connects to **AWS S3** to fetch list of models and thumbnails  
- Runs inside a **private EC2 instance**  
- Exposed only to frontend via **Nginx reverse proxy**

**Infrastructure**  
- Provisioned using **Terraform**  
- Includes:
  - VPC with public and private subnets
  - Internet Gateway and NAT Gateway
  - EC2 instances with Security Groups
  - S3 bucket for model storage

---

## 🗂️ Features

✅ Fetch & display 3D models stored in S3  
✅ React app with responsive UI  
✅ Secure backend in private subnet  
✅ Terraform-managed cloud infrastructure  
✅ Nginx proxy for safe API access  
✅ Dockerized for consistency and portability 

---
## 📦 Tech Stack

| Category       | Tools/Services                       |
|----------------|--------------------------------------|
| Frontend       | React, Nginx                         |
| Backend        | Node.js, Express, AWS SDK            |
| Cloud Platform | AWS EC2, S3, IAM                     |
| DevOps         | Docker, Terraform                    |
| Security       | Private subnet, SG rules, Env vars   |

---

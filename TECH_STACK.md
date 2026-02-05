# Tech Stack Recommendation: Smart Menu SaaS

As the Tech Lead/Architect, I have refined the stack based on your preferences: **Next.js 16 (Fullstack)**, **NoSQL (MongoDB)**, and **AWS Native Services**. This stack simplifies the architecture by unifying the frontend and backend into a single performant application.

## 🏗 High-Level Architecture
**Monorepo Structure (Nx)**:  
Using **Nx** for high-performance build tooling. Even with a single Next.js app, Nx helps separate common logic/UI libraries if we expand later.

---

## 💻 & ⚙️ Fullstack Web App (Frontend + Backend)
**Framework**: [Next.js 16 (App Router)](https://nextjs.org/)  
**Language**: TypeScript  

**Why Next.js 16?**
1.  **Unified Stack**: No separate backend service. We will use **Next.js API Routes / Server Actions** for all backend logic ("Backend-for-Frontend").
2.  **Performance**: Next.js 16 brings the latest React compiler and server actions for snappy interactions.
3.  **Routing & Performance (Crucial for Scale)**:
    -   `app/admin/...` & `app/dashboard/...`: Dynamic rendering (Admin panels).
    -   `app/[subdomain]/...`: **Dynamic Public Menu**.
        -   **Mechanism**: Middleware detects subdomain -> rewrites to dynamic route.
        -   **Storage**: Menu data is stored as optimized JSON in MongoDB.
        -   **⚡ Performance Strategy (The "Robust" Recommendation)**:
            -   **ISR (Incremental Static Regeneration)**: We will NOT fetch from the DB on every view.
            -   **How it works**: The first visitor triggers a DB fetch. Next.js generates the HTML and **caches it at the Edge (CDN)**.
            -   **Result**: Subsequent 10,000 users get instant static HTML (0 DB hits). Secure, standard, and handles millions of scans easily.
            -   **Updates**: When a restaurant publishes changes, we trigger `revalidatePath` to instantly refresh the cache.
        -   **Infrastructure**: Subdomains will be configured via **AWS Route 53** (wildcard records).

**UI Library**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)  
**State Management**: `TanStack Query` (Server state) + `Zustand` (Client state).

---

## 🗄 Database & Storage
**Database**: **MongoDB**  
**ORM**: [Prisma](https://www.prisma.io/)  

**Why MongoDB + Prisma?**
-   **Flexible Schema**: Perfect for "Menu Templates" and "Food Items" which might have varying attributes (modifiers, addons) that don't fit efficiently in strict SQL rows.
-   **Prisma Support**: Prisma Client works excellently with MongoDB, keeping our type safety.
-   **Note**: Using **AWS DocumentDB** as the production instance.

**File Storage**: **AWS S3**  
-   Restaurant logos, food images, QR codes.

---

## ☁️ Infrastructure & Hosting (AWS)
**Containerization**: **Docker**  
-   We will containerize the Next.js application for consistent deployment.

**Infrastructure as Code (IaC)**: **Terraform**
-   **Role**: Explicit provisioning of all AWS resources.
-   **Scope**:
    -   Provision **DocumentDB** Cluster (VPC, Security Groups).
    -   Provision **S3 Buckets** (Assets, Logs).
    -   Provision **Amplify App** resource (Connecting repo to AWS).
    -   Provision **Route 53** Zones and Records.

**Hosting**: **AWS Amplify (Gen 2)**
-   Managed via Terraform resource `aws_amplify_app`.
-   Deployment triggered via git push (CI/CD).

---

## 🔐 Authentication
**Approach**: **Custom Auth (NextAuth.js / Auth.js v5)**
-   Since we are fully in the Next.js ecosystem, **Auth.js (formerly NextAuth)** is the standard.
-   It handles sessions (JWT), secure cookies, and works with our Prisma + MongoDB setup out of the box.

---

## 🗓 Removed/Deferred Features
-   **Payments**: Deferred for future phase.

---

## Summary of Changes

| Component | Choice | Update Reason |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (Fullstack) | User request + Simplification. |
| **Backend** | API Routes (in Next.js) | Removed NestJS to reduce complexity. |
| **Database** | MongoDB (NoSQL) | User request. Better for flexible menu data. |
| **Infra** | AWS Amplify / DocumentDB | User request for AWS services. |
| **Payments** | *Skipped* | Deferred. |

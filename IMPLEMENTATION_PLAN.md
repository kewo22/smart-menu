# Implementation Plan: Smart Menu SaaS

This document serves as the technical blueprint for the "Smart Menu" SaaS. It is designed to be executed by the development team/agent.

## 🎯 Goal
Build a scalable, multi-tenant SaaS that allows restaurant owners to manage digital menus and customers to view them via QR codes. 
**Key Performance Indicator (KPI)**: Public menu load time < 200ms (achieved via ISR).

---

## 🛠 Tech Stack Strategy
| Component | Choice | Justification |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16** (App Router) | Unified Fullstack, Server Actions, Best-in-class ISR |
| **Database** | **MongoDB** (on AWS DocumentDB) | Flexible schema for diverse menu structures. |
| **ORM** | **Prisma** | Type-safety for NoSQL. |
| **Auth** | **Auth.js** (v5) | Secure, session-based auth compatible with Next.js App Router. |
| **Styling** | **Tailwind + shadcn/ui** | Admin/Dashboard: **Dark/Light Mode**. Menu: **Single Theme** (Fixed). |
| **Infra** | **AWS Amplify (Gen 2)** | "Code-first" infra, managed CI/CD, auto-configured CloudFront. |

---

## 🔒 Security Architecture
### 1. Authentication & Authorization (RBAC)
-   **Library**: Auth.js with valid JWT strategy.
-   **Roles**:
    -   `SUPER_ADMIN`: Can manage Tenants (Restaurants) and global configs. Access to `/admin`.
    -   `RESTAURANT_OWNER`: Can only manage *their* linked Restaurant. Access to `/dashboard`.
-   **Implementation**: Create a `middleware.ts` that enforces role checks on protected routes.

### 2. Multi-Tenancy & Data Isolation
-   **Strict Rule**: Every Prisma query in the `/dashboard` scope MUST include the `restaurantId`.
-   **Mechanism**:
    -   Do not rely solely on client-passed IDs.
    -   Derive `restaurantId` from the authenticated user's session in the backend Server Action.
-   **Validation**: Use **Zod** schemas for all inputs to prevent injection and ensuring data integrity.

---

## ☁️ Infrastructure & DevOps (Terraform)
We will use **Terraform** to manage the lifecycle of all AWS resources.

### 1. Terraform State Strategy
-   **Backend**: S3 Bucket (Encrypted) + DynamoDB (Locking).
-   **Structure**: Modular approach (`modules/networking`, `modules/database`, `modules/hosting`).

### 2. Managed Resources
-   **VPC**: Custom VPC to isolate the DocumentDB cluster securely.
-   **DocumentDB**: MongoDB-compatible cluster running in private subnets.
-   **S3**: Buckets for public assets, configured with CORS.
-   **Amplify**: Use `resource "aws_amplify_app"` to define the app settings, environment variables, and build settings code-first.
-   **Route 53**: Manage DNS zones and alias records.

### 3. CI/CD Integration
-   Terraform should run in a separate pipeline (e.g., GitHub Actions) to `plan` and `apply` infra changes.
-   Application code deploys via Amplify's built-in git integration.

---

## 📅 Execution Phases

### Phase 1: Foundation (The Skeleton)
-   [ ] Initialize Nx Monorepo (or standard Next.js app if mono not strictly needed).
-   [ ] Configure **Tailwind**, **shadcn/ui**, and **ESLint**.
-   [ ] Setup **Prisma** schema with `User`, `Restaurant`, `Menu`, `Item` models (MongoDB).
-   [ ] Implement **Auth.js** authentication with Google/Email providers.

### Phase 2: Core SaaS Logic (The Brain)
-   [ ] **Tenant Management**: APIs to create/update Restaurants.
-   [ ] **Menu Builder**: APIs for CRUD on Categories/Items (JSON storage).
-   [ ] **Admin Dashboard**: Tables to view all registered restaurants.
-   [ ] **Owner Dashboard**: Forms to edit restaurant profile and menu.

### Phase 3: The Public View (The Face)
-   [ ] **Subdomain Middleware**: Implement the rewrite logic.
-   [ ] **Menu Renderer**: Create the dynamic page at `/[subdomain]`.
-   [ ] **ISR Implementation**: Add `revalidatePath` hooks on menu save to purge cache.
-   [ ] **Design**: High-fidelity, mobile-first responsive view for the menu.

### Phase 4: Production Readiness
-   [ ] **AWS Amplify Config**: `amplify.yml` setup.
-   [ ] **Route 53**: Domain configuration.
-   [ ] **Error Logging**: Sentry or AWS CloudWatch integration.

# Vehicle Rental System

A complete vehicle rental management system with role-based access (Admin & Customer), JWT authentication, and automated booking logic.

## Repository
https://github.com/ShuvoSW/Vehicle-Rental-System

## Live Demo
https://vehicle-rental-system-xi.vercel.app

---

### Default Test Accounts (Auto-created on first run)

**Admin**  
Email: `admin1@gmail.com`  
Password: `strongPassword123`  
Role: `admin`

**Customer**  
Email: `custome1@gmail.com`  
Password: `strongPassword123`  
Role: `customer`

---

### Features

**Customers**  
- Register & login  
- Browse all vehicles  
- Book any available vehicle  
- View own booking history  
- Cancel booking before start date  

**Admins**  
- Full CRUD on vehicles and users  
- View all bookings  
- Manually mark booking as returned  

**Smart Automation**  
- Total price auto-calculation  
- Expired bookings automatically set to "returned"  
- Vehicle availability updated on return/cancellation  

---

### Technology Stack

- TypeScript  
- Node.js  
- Express.js  
- PostgreSQL  
- JWT + bcryptjs  
- Vercel (deployment)

---

### API Endpoints

**Auth**  
POST   /api/v1/auth/signUp          → Register user (Public)  
POST   /api/v1/auth/signIn          → Login & get token (Public)

**Vehicles**  
GET    /api/v1/vehicles             → Get all vehicles (Public)  
GET    /api/v1/vehicles/:id         → Get single vehicle (Public)  
POST   /api/v1/vehicles             → Add vehicle (Admin only)  
PUT    /api/v1/vehicles/:id         → Update vehicle (Admin only)  
DELETE /api/v1/vehicles/:id         → Delete vehicle (Admin only)

**Bookings**  
POST   /api/v1/bookings             → Create booking (Authenticated)  
GET    /api/v1/bookings             → Get bookings (own for customer, all for admin) (Authenticated)  
PUT    /api/v1/bookings/:id         → Cancel or return booking (Authenticated)

**Users (Admin only)**  
GET    /api/v1/users                → Get all users  
PUT    /api/v1/users/:id            → Update user (admin or self)  
DELETE /api/v1/users/:id            → Delete user

---

### Local Setup

```bash
Built with passion by Shuvo Majumder

git clone https://github.com/ShuvoSW/Vehicle-Rental-System.git
cd Vehicle-Rental-System
npm install

.env file
envPORT=5000
CONNECTION_STR=postgresql://neondb_owner:npg_T7iMcuv5NAyK@ep-rapid-voice-a8t6e2pi-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET="KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
Run database initialization (creates tables + default admin & customer)
Bash: npx tsx ./src/config/DB.ts
Start development server
Bash: npm run dev
Server runs at http://localhost:5000



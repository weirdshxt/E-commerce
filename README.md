# Organic Store - E-commerce Platform

A modern, responsive e-commerce platform for organic products built with React, TypeScript, and Node.js. Features a beautiful landing page, product management, user authentication, and category-based browsing.

## 👨‍💻 About Me

**Kabir Khan** - Full Stack Developer

I'm a passionate developer who loves creating modern web applications. This organic store project showcases my skills in:

- **Frontend Development**: React, TypeScript, Tailwind CSS
- **Backend Development**: Node.js, Express.js, RESTful APIs
- **Database Management**: JSON-based data persistence
- **UI/UX Design**: Responsive design with mobile-first approach
- **State Management**: React Context API
- **Version Control**: Git and GitHub

Connect with me:

- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [Your Email]

---

## 🌟 Features

### Frontend Features

- **Responsive Design**: Mobile-first approach with collapsible navigation
- **Landing Page**: Hero section with featured products and category browsing
- **Product Catalog**: Grid layout with search and category filtering
- **Product Details**: Individual product pages with feedback system
- **Admin Panel**: Add, edit, and delete products (admin only)
- **User Authentication**: Login/logout functionality
- **Contact Form**: Get in touch section with form validation

### Backend Features

- **RESTful API**: Express.js server with TypeScript
- **Product Management**: CRUD operations for products
- **Feedback System**: User feedback collection and storage
- **Category Filtering**: Server-side category-based product filtering
- **Data Persistence**: JSON file-based storage

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JSON** - Data storage

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone <repository-url>
cd Assignment2nd
```

### Install Dependencies

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:4000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
Assignment2nd/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Server entry point
│   │   └── routes/
│   │       ├── products.ts   # Product API routes
│   │       └── feedback.ts   # Feedback API routes
│   ├── products.json         # Product data
│   ├── feedback.json         # Feedback data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx   # Responsive navigation
│   │   │   └── Footer.tsx   # Footer component
│   │   ├── context/
│   │   │   └── AdminContext.tsx  # Admin state management
│   │   ├── pages/
│   │   │   ├── Hero.tsx           # Landing page
│   │   │   ├── HomePage.tsx       # Product catalog
│   │   │   ├── ProductDetailPage.tsx  # Product details
│   │   │   ├── AddProductPage.tsx     # Add product form
│   │   │   ├── EditProductPage.tsx    # Edit product form
│   │   │   ├── LoginPage.tsx         # Authentication
│   │   │   └── imageOptions.ts       # Image options data
│   │   ├── App.tsx                   # Main app component
│   │   └── main.tsx                  # App entry point
│   └── package.json
└── README.md
```

## 🎯 Usage Guide

### For Customers

1. **Browse Products**: Visit the landing page to see featured products
2. **Category Navigation**: Click on category cards to filter products
3. **Product Details**: Click on any product to view details and leave feedback
4. **Search**: Use the search bar to find specific products
5. **Contact**: Use the contact form to get in touch

### For Admins

#### Admin Login Details

```
Password: admin123
URL: /login

```

#### Admin Features

1. **Login**: Use the admin credentials above to access admin features
2. **Add Products**: Navigate to "Add Product" to create new listings
3. **Edit Products**: Click the edit button on any product card
4. **Delete Products**: Use the delete button to remove products
5. **Manage Feedback**: View and manage user feedback

> **Note**: Admin credentials are hardcoded for demo purposes. In production, implement proper authentication with database storage.

## 🔧 API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products?category=oil` - Get products by category
- `GET /products/:id` - Get specific product
- `POST /products` - Add new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Feedback

- `GET /feedback/:productId` - Get feedback for product
- `POST /feedback` - Submit new feedback

## 🎨 Key Features Explained

### Responsive Navigation

- Collapsible hamburger menu on mobile devices
- Smooth transitions and hover effects
- Admin-specific controls

### Category Filtering

- Server-side filtering by category
- Dynamic category buttons
- Related products section on product detail pages

### Product Management

- Image selection from predefined options
- Form validation and error handling
- Real-time preview of selected images

### Feedback System

- User-friendly feedback form
- Product-specific feedback storage
- Feedback display on product pages

## 🔒 Security Features

- Admin authentication system
- Form validation and sanitization
- Protected admin routes

## 🚀 Deployment

### Backend Deployment

1. Set up a Node.js hosting service (Heroku, Vercel, etc.)
2. Configure environment variables
3. Deploy the backend directory

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to a static hosting service
3. Update API endpoints to production URLs

## 👥 Support

For support or questions, please open an issue in the repository or contact me.

---

**Built with ❤️ by Kabir Khan using React, TypeScript, and Node.js**

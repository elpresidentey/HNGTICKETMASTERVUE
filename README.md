# Ticket Management App

A modern, responsive single-page application built with Vue.js 3 for managing support tickets. This application provides a complete ticket management system with user authentication, dashboard analytics, and full CRUD operations for tickets.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19.0 or v22.12.0+)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ticket-management-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface

## 🔐 Demo Credentials

The application uses simulated authentication for demonstration purposes. You can use any valid email and password combination to log in:

### Example Login Credentials
- **Email:** `demo@example.com`
- **Password:** `password123` (minimum 6 characters)

### Example Signup
- **Name:** `Demo User`
- **Email:** `demo@example.com`
- **Password:** `password123`
- **Confirm Password:** `password123`

**Note:** The authentication system accepts any valid email format with a password of at least 6 characters.

## 🏗️ Architecture Overview

### Technology Stack

- **Frontend Framework:** Vue.js 3 with Composition API
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Form Validation:** VeeValidate + Yup
- **Styling:** Tailwind CSS 4
- **Notifications:** Vue Toastification
- **Testing:** Vitest + Vue Testing Library
- **Storage:** LocalStorage (client-side persistence)

### Project Structure

```
src/
├── assets/           # Static assets and global styles
├── components/       # Reusable Vue components
│   ├── CreateTicketModal.vue
│   ├── DeleteTicketModal.vue
│   ├── EditTicketModal.vue
│   ├── LoginForm.vue
│   ├── SignupForm.vue
│   └── TicketCard.vue
├── router/           # Vue Router configuration
├── services/         # Business logic and API services
│   └── storage.js    # LocalStorage service
├── stores/           # Pinia state management
│   ├── auth.js       # Authentication store
│   └── tickets.js    # Ticket management store
├── test/             # Test files
├── views/            # Page components
│   ├── DashboardView.vue
│   ├── HomeView.vue
│   └── TicketsView.vue
├── App.vue           # Root component
└── main.js           # Application entry point
```

## 📊 Pinia Store Structure & Data Flow

### Authentication Store (`stores/auth.js`)

**State:**
- `user` - Current authenticated user object
- `isLoading` - Loading state for auth operations
- `error` - Error messages from auth operations

**Getters:**
- `isAuthenticated` - Computed property checking if user is logged in

**Actions:**
- `login(credentials)` - Authenticate user with email/password
- `signup(userData)` - Register new user account
- `logout()` - Clear user session and redirect
- `checkAuth()` - Verify existing session on app load
- `handleSessionExpired()` - Handle expired sessions
- `clearError()` - Clear error messages

**Data Flow:**
```
User Input → Form Validation → Auth Store Action → Storage Service → Update State → UI Update
```

### Tickets Store (`stores/tickets.js`)

**State:**
- `tickets` - Array of all ticket objects
- `isLoading` - Loading state for ticket operations
- `error` - Error messages from ticket operations

**Getters:**
- `ticketStats` - Computed statistics (total, open, in_progress, closed counts)
- `getTicketById(id)` - Find specific ticket by ID

**Actions:**
- `loadTickets()` - Fetch all tickets from storage
- `createTicket(ticketData)` - Create new ticket
- `updateTicket(id, updates)` - Update existing ticket
- `deleteTicket(id)` - Remove ticket
- `clearError()` - Clear error messages

**Data Flow:**
```
Component Action → Tickets Store → Storage Service → LocalStorage → Update State → Reactive UI Update
```

### Storage Service (`services/storage.js`)

**Session Management:**
- `setSession(token)` - Store authentication token
- `getSession()` - Retrieve current session token
- `clearSession()` - Remove session token
- `isAuthenticated()` - Check if valid session exists

**Ticket Operations:**
- `getTickets()` - Load tickets from localStorage
- `saveTickets(tickets)` - Save tickets array to localStorage
- `createTicket(ticketData)` - Add new ticket with validation
- `updateTicket(id, updates)` - Modify existing ticket
- `deleteTicket(id)` - Remove ticket by ID
- `getTicketById(id)` - Retrieve single ticket

**Storage Keys:**
- `ticketapp_session` - Authentication token storage
- `ticketapp_tickets` - Ticket data storage

## 🎨 Design System

### Color Palette
- **Open Status:** Green (`#10B981`)
- **In Progress Status:** Amber (`#F59E0B`)
- **Closed Status:** Gray (`#6B7280`)
- **Primary:** Blue (`#3B82F6`)
- **Error:** Red (`#EF4444`)

### Component Patterns
- **Cards:** Rounded corners, subtle shadows, hover states
- **Modals:** Backdrop blur, centered positioning, slide animations
- **Forms:** Inline validation, focus states, error highlighting
- **Buttons:** Consistent styling, loading states, accessibility focus

## 🧪 Testing

The application includes comprehensive test coverage:

### Test Categories
- **Unit Tests:** Store logic, validation functions, services
- **Component Tests:** Individual Vue component behavior
- **Integration Tests:** Authentication flow, CRUD operations
- **Accessibility Tests:** Keyboard navigation, screen reader support

### Running Tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode during development
npm run test:watch

# Run tests with UI interface
npm run test:ui
```

### Test Files Structure
```
src/test/
├── setup.js                           # Test configuration
├── stores/                            # Store unit tests
├── services/                          # Service unit tests
├── components/                        # Component tests
├── integration/                       # Integration tests
└── accessibility/                     # Accessibility tests
```

## 🔧 Configuration

### Environment Variables
The application runs entirely client-side and doesn't require environment variables for basic functionality.

### Tailwind Configuration
Custom configuration in `tailwind.config.js` includes:
- Custom color palette for ticket statuses
- Form plugin for consistent input styling
- Responsive breakpoints

### Vite Configuration
- Vue plugin with devtools
- Test environment setup with jsdom
- Build optimizations for production

## 🚨 Known Issues & Limitations

### Current Limitations
1. **Client-Side Only:** All data is stored in localStorage and will be lost if browser data is cleared
2. **No Real Authentication:** Uses simulated authentication for demonstration purposes
3. **No Data Persistence:** No backend database - data exists only in browser storage
4. **Single User:** No multi-user support or user isolation
5. **No File Attachments:** Tickets support text only, no file uploads
6. **Limited Search:** No advanced search or filtering capabilities

### Browser Compatibility
- **Supported:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Not Supported:** Internet Explorer, very old browser versions

### Storage Limitations
- **LocalStorage Limit:** Typically 5-10MB per domain
- **Data Loss Risk:** Data cleared when browser storage is cleared
- **No Backup:** No automatic data backup or recovery

## 🔮 Future Improvements

### Planned Enhancements
1. **Backend Integration:**
   - Real API endpoints for authentication and data
   - Database persistence (PostgreSQL/MongoDB)
   - User session management with JWT tokens

2. **Advanced Features:**
   - File attachments for tickets
   - Ticket comments and activity history
   - Email notifications for ticket updates
   - Advanced search and filtering
   - Ticket categories and priorities
   - User roles and permissions

3. **Performance Optimizations:**
   - Virtual scrolling for large ticket lists
   - Lazy loading of ticket details
   - Caching strategies for better performance
   - Progressive Web App (PWA) capabilities

4. **Enhanced UX:**
   - Drag-and-drop ticket status updates
   - Bulk operations (select multiple tickets)
   - Keyboard shortcuts for power users
   - Dark mode theme option
   - Customizable dashboard widgets

5. **Enterprise Features:**
   - Multi-tenant support
   - Advanced reporting and analytics
   - Integration with external tools (Slack, JIRA)
   - API for third-party integrations
   - Audit logs and compliance features

### Technical Debt
- Add comprehensive error boundaries
- Implement proper loading states for all operations
- Add more granular error handling
- Improve test coverage for edge cases
- Add performance monitoring and analytics

## 📝 Development Guidelines

### Code Style
- Use Vue 3 Composition API consistently
- Follow Vue.js official style guide
- Use TypeScript-style JSDoc comments for better IDE support
- Maintain consistent naming conventions

### Component Guidelines
- Keep components focused and single-purpose
- Use props for data down, events for data up
- Implement proper prop validation
- Include accessibility attributes (ARIA labels, roles)

### State Management
- Use Pinia stores for shared state only
- Keep component-specific state local
- Implement proper error handling in all store actions
- Use computed properties for derived state

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Ensure all tests pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🚀 Deployment

### GitHub Pages Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Push your code to a GitHub repository
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/dist" folder
   - Your app will be available at `https://yourusername.github.io/repository-name`

### Netlify Deployment

1. **Connect your GitHub repository to Netlify**
2. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy automatically on every push to main branch**

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Vercel will automatically detect Vue.js and configure:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Deploy with zero configuration**

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents to your web server**

3. **Configure your server to serve the `index.html` for all routes (SPA routing)**

## 📄 License

This project is created for demonstration purposes. Feel free to use it as a starting point for your own projects.

---

**Built with ❤️ using Vue.js 3, Pinia, and Tailwind CSS**
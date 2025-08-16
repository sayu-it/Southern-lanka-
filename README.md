# Southern Lanka Sale - Matara Vehicle Management System

A complete web-based vehicle sales management system designed for Southern Lanka Sale in Matara, featuring admin functionality for vehicle registration, CRUD operations, dashboard analytics, and user authentication.

## Features

### 🔐 Authentication System
- Secure admin login with username/password validation
- Session management with persistent login state
- Success/error notifications for login attempts
- **Default Credentials:**
  - Username: `admin`
  - Password: `admin123`

### 🚗 Vehicle Management (CRUD Operations)
- **Create**: Add new vehicles with complete details
- **Read**: View vehicle inventory with detailed information
- **Update**: Edit existing vehicle information
- **Delete**: Remove vehicles from inventory
- Vehicle details include: Model, Type, Tyre Size, Fuel Type, Engine, Price, Description

### 📊 Dashboard & Analytics
- Real-time statistics display
- Total vehicles count
- Sales tracking and revenue calculation
- Monthly sales reports
- Interactive sales analytics chart using Chart.js
- Visual data representation with red/white theme

### 📄 Static Pages
- **About Us**: Company information and mission
- **Contact Us**: Complete contact details with business hours
- Professional content and layout

### 🎨 Design Features
- **Color Scheme**: Red and white as requested
- Responsive design for desktop and mobile
- Modern UI with hover effects and animations
- Professional card-based layout
- Modal dialogs for detailed views
- Smooth transitions and micro-interactions

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for analytics visualization
- **Icons**: Font Awesome for professional icons
- **Storage**: LocalStorage for data persistence
- **Responsive**: Mobile-first responsive design

## File Structure

```
southern-lanka-sale/
├── index.html          # Main application file
├── css/
│   └── styles.css      # Complete styling with red/white theme
├── js/
│   └── app.js          # Application logic and functionality
├── images/             # Image assets directory
├── pages/              # Additional pages directory
└── README.md           # This documentation
```

## Installation & Usage

1. **Download the System**
   - Extract all files to your web server directory
   - Ensure all files maintain their folder structure

2. **Open the Application**
   - Open `index.html` in a web browser
   - Or deploy to a web server for production use

3. **Admin Access**
   - Click "Admin Login" or "Admin Access"
   - Enter credentials: `admin` / `admin123`
   - Access full admin functionality

## System Functionality

### Login Process
1. Click "Admin Access" button
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click "Login"
5. Success: Redirects to dashboard
6. Failure: Shows error notification

### Vehicle Management
1. **Add Vehicle**: Navigate to "Add Vehicle" tab
2. **View Vehicles**: Click "Vehicles" tab to see inventory
3. **View Details**: Click "View" button on any vehicle card
4. **Edit Vehicle**: Click "Edit" button to modify details
5. **Delete Vehicle**: Click "Delete" button (with confirmation)

### Dashboard Features
- View total vehicles, sales, and revenue
- Monitor monthly performance
- Analyze sales trends with interactive charts
- Real-time data updates

## Sample Data

The system includes sample vehicles for demonstration:
- Toyota Camry 2023 - $28,500
- Honda CR-V 2022 - $32,000
- BMW 320i 2021 - $45,000

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Data Persistence

- All data is stored in browser's LocalStorage
- Data persists between sessions
- No server-side database required
- Easy to migrate to backend database if needed

## Security Features

- Input validation on all forms
- XSS protection through proper escaping
- Session management
- Secure password handling

## Customization

### Changing Admin Credentials
Edit the `adminCredentials` object in `js/app.js`:
```javascript
const adminCredentials = {
    username: 'your_username',
    password: 'your_password'
};
```

### Color Scheme Modification
Update CSS variables in `css/styles.css`:
```css
:root {
    --primary-red: #dc3545;
    --dark-red: #c82333;
    --white: #ffffff;
    /* Add your custom colors */
}
```

## Support & Maintenance

- Regular browser compatibility testing recommended
- Data backup through LocalStorage export
- Easy to extend with additional features
- Clean, commented code for easy maintenance

## Future Enhancements

- Backend database integration
- Multi-user support with roles
- Advanced reporting features
- Image upload for vehicles
- Customer management system
- Sales transaction tracking

---

**Southern Lanka Sale - Matara**  
*Your trusted partner for quality vehicles in the Southern Province*

For technical support or customization requests, please contact the development team.


// Southern Lanka Sale - Vehicle Management System
// Main Application JavaScript

// Global Variables
let vehicles = [];
let sales = [];
let currentUser = null;
let editingVehicleId = null;

// Default Admin Credentials
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
});

// Initialize Application
function initializeApp() {
    // Load data from localStorage
    loadDataFromStorage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Show welcome page by default
    showPage('welcome');
}

// Setup Event Listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Vehicle form
    document.getElementById('vehicleForm').addEventListener('submit', handleAddVehicle);
    
    // Edit vehicle form
    document.getElementById('editVehicleForm').addEventListener('submit', handleEditVehicle);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        currentUser = { username: username, role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        messageDiv.innerHTML = '<div class="message success">Login successful! Redirecting...</div>';
        
        setTimeout(() => {
            closeLoginModal();
            showAdminInterface();
            showPage('dashboard');
            updateDashboard();
        }, 1000);
    } else {
        messageDiv.innerHTML = '<div class="message error">Invalid username or password!</div>';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    hideAdminInterface();
    showPage('welcome');
    
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('vehicleForm').reset();
    
    // Clear messages
    document.getElementById('loginMessage').innerHTML = '';
}

function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showAdminInterface();
        showPage('dashboard');
        updateDashboard();
    }
}

function showAdminInterface() {
    document.getElementById('mainNav').style.display = 'block';
    document.getElementById('loginBtn').style.display = 'none';
}

function hideAdminInterface() {
    document.getElementById('mainNav').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'block';
}

// Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('username').focus();
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').innerHTML = '';
}

function openVehicleModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const modalContent = `
        <div class="vehicle-detail-header">
            <h2>${vehicle.model}</h2>
            <div class="price">$${parseFloat(vehicle.price).toLocaleString()}</div>
        </div>
        <div class="vehicle-detail-body">
            <div class="detail-grid">
                <div class="detail-box">
                    <i class="fas fa-car"></i>
                    <h4>Type</h4>
                    <p>${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</p>
                </div>
                <div class="detail-box">
                    <i class="fas fa-cog"></i>
                    <h4>Engine</h4>
                    <p>${vehicle.engine}</p>
                </div>
                <div class="detail-box">
                    <i class="fas fa-gas-pump"></i>
                    <h4>Fuel Type</h4>
                    <p>${vehicle.fuel.charAt(0).toUpperCase() + vehicle.fuel.slice(1)}</p>
                </div>
                <div class="detail-box">
                    <i class="fas fa-circle"></i>
                    <h4>Tyre Size</h4>
                    <p>${vehicle.tyre}</p>
                </div>
            </div>
            ${vehicle.description ? `
                <div class="description">
                    <h4>Description</h4>
                    <p>${vehicle.description}</p>
                </div>
            ` : ''}
            <div class="vehicle-actions" style="margin-top: 2rem;">
                <button onclick="openEditModal('${vehicle.id}')" class="btn btn-warning btn-small">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteVehicle('${vehicle.id}')" class="btn btn-danger btn-small">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('vehicleDetails').innerHTML = modalContent;
    document.getElementById('vehicleModal').style.display = 'block';
}

function closeVehicleModal() {
    document.getElementById('vehicleModal').style.display = 'none';
}

function openEditModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    editingVehicleId = vehicleId;
    
    // Populate form fields
    document.getElementById('editVehicleId').value = vehicle.id;
    document.getElementById('editModel').value = vehicle.model;
    document.getElementById('editType').value = vehicle.type;
    document.getElementById('editTyre').value = vehicle.tyre;
    document.getElementById('editFuel').value = vehicle.fuel;
    document.getElementById('editEngine').value = vehicle.engine;
    document.getElementById('editPrice').value = vehicle.price;
    document.getElementById('editDescription').value = vehicle.description || '';
    
    // Close vehicle details modal and open edit modal
    closeVehicleModal();
    document.getElementById('editVehicleModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editVehicleModal').style.display = 'none';
    document.getElementById('editVehicleForm').reset();
    editingVehicleId = null;
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load page-specific content
    if (pageId === 'vehicles') {
        loadVehicles();
    } else if (pageId === 'dashboard') {
        updateDashboard();
    }
}

// Vehicle Management Functions
function handleAddVehicle(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const vehicle = {
        id: generateId(),
        model: formData.get('model'),
        type: formData.get('type'),
        tyre: formData.get('tyre'),
        fuel: formData.get('fuel'),
        engine: formData.get('engine'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        dateAdded: new Date().toISOString(),
        status: 'available'
    };
    
    vehicles.push(vehicle);
    saveDataToStorage();
    
    // Show success message
    showNotification('Vehicle added successfully!', 'success');
    
    // Reset form
    event.target.reset();
    
    // Redirect to vehicles page
    showPage('vehicles');
}

function handleEditVehicle(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const vehicleIndex = vehicles.findIndex(v => v.id === editingVehicleId);
    
    if (vehicleIndex !== -1) {
        vehicles[vehicleIndex] = {
            ...vehicles[vehicleIndex],
            model: formData.get('model'),
            type: formData.get('type'),
            tyre: formData.get('tyre'),
            fuel: formData.get('fuel'),
            engine: formData.get('engine'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description')
        };
        
        saveDataToStorage();
        closeEditModal();
        loadVehicles();
        updateDashboard();
        
        showNotification('Vehicle updated successfully!', 'success');
    }
}

function deleteVehicle(vehicleId) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        vehicles = vehicles.filter(v => v.id !== vehicleId);
        saveDataToStorage();
        closeVehicleModal();
        loadVehicles();
        updateDashboard();
        
        showNotification('Vehicle deleted successfully!', 'success');
    }
}

function loadVehicles() {
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    
    if (vehicles.length === 0) {
        vehiclesGrid.innerHTML = `
            <div class="no-vehicles">
                <h3>No vehicles found</h3>
                <p>Add your first vehicle to get started!</p>
                <button onclick="showPage('add-vehicle')" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add Vehicle
                </button>
            </div>
        `;
        return;
    }
    
    vehiclesGrid.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card">
            <div class="vehicle-card-header">
                <h3>${vehicle.model}</h3>
                <div class="price">$${parseFloat(vehicle.price).toLocaleString()}</div>
            </div>
            <div class="vehicle-card-body">
                <div class="vehicle-details">
                    <div class="detail-item">
                        <i class="fas fa-car"></i>
                        <span>${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.fuel.charAt(0).toUpperCase() + vehicle.fuel.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-cog"></i>
                        <span>${vehicle.engine}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-circle"></i>
                        <span>${vehicle.tyre}</span>
                    </div>
                </div>
                <div class="vehicle-actions">
                    <button onclick="openVehicleModal('${vehicle.id}')" class="btn btn-info btn-small">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button onclick="openEditModal('${vehicle.id}')" class="btn btn-warning btn-small">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="deleteVehicle('${vehicle.id}')" class="btn btn-danger btn-small">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Dashboard Functions
function updateDashboard() {
    // Update statistics
    document.getElementById('totalVehicles').textContent = vehicles.length;
    document.getElementById('totalSales').textContent = sales.length;
    
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
    
    const currentMonth = new Date().getMonth();
    const monthlySales = sales.filter(sale => new Date(sale.date).getMonth() === currentMonth);
    document.getElementById('monthlySales').textContent = monthlySales.length;
    
    // Update charts
    updateSalesChart();
}

function updateSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Generate sample data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const salesData = [12, 19, 8, 15, 25, 18];
    
    // Destroy existing chart if it exists
    if (window.salesChartInstance) {
        window.salesChartInstance.destroy();
    }
    
    window.salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Sales',
                data: salesData,
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e9ecef'
                    }
                },
                x: {
                    grid: {
                        color: '#e9ecef'
                    }
                }
            }
        }
    });
}

// Utility Functions
function generateId() {
    return 'vehicle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function resetForm() {
    document.getElementById('vehicleForm').reset();
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        padding: 1rem 1.5rem;
        border-radius: 5px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Data Management
function saveDataToStorage() {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    localStorage.setItem('sales', JSON.stringify(sales));
}

function loadDataFromStorage() {
    const savedVehicles = localStorage.getItem('vehicles');
    const savedSales = localStorage.getItem('sales');
    
    if (savedVehicles) {
        vehicles = JSON.parse(savedVehicles);
    }
    
    if (savedSales) {
        sales = JSON.parse(savedSales);
    }
}

function loadSampleData() {
    // Only load sample data if no data exists
    if (vehicles.length === 0) {
        vehicles = [
            {
                id: 'vehicle_sample_1',
                model: 'Toyota Camry 2023',
                type: 'sedan',
                tyre: '225/60R16',
                fuel: 'petrol',
                engine: '2.5L 4-Cylinder',
                price: 28500,
                description: 'Excellent condition, low mileage, fully serviced',
                dateAdded: new Date().toISOString(),
                status: 'available'
            },
            {
                id: 'vehicle_sample_2',
                model: 'Honda CR-V 2022',
                type: 'suv',
                tyre: '235/65R17',
                fuel: 'petrol',
                engine: '1.5L Turbo',
                price: 32000,
                description: 'Family-friendly SUV with advanced safety features',
                dateAdded: new Date().toISOString(),
                status: 'available'
            },
            {
                id: 'vehicle_sample_3',
                model: 'BMW 320i 2021',
                type: 'sedan',
                tyre: '225/50R17',
                fuel: 'petrol',
                engine: '2.0L Twin Turbo',
                price: 45000,
                description: 'Luxury sedan with premium interior and performance',
                dateAdded: new Date().toISOString(),
                status: 'available'
            }
        ];
        
        sales = [
            {
                id: 'sale_1',
                vehicleId: 'vehicle_sample_1',
                amount: 28500,
                date: '2024-07-15',
                customer: 'John Doe'
            },
            {
                id: 'sale_2',
                vehicleId: 'vehicle_sample_2',
                amount: 32000,
                date: '2024-08-01',
                customer: 'Jane Smith'
            }
        ];
        
        saveDataToStorage();
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .no-vehicles {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .no-vehicles h3 {
        color: #dc3545;
        margin-bottom: 1rem;
    }
    
    .no-vehicles p {
        color: #6c757d;
        margin-bottom: 2rem;
    }
`;
document.head.appendChild(style);


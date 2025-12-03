# Smart Attendance System - Database Documentation

## Current Setup: localStorage

The application currently uses **localStorage** for data persistence. All data is stored locally in the browser.

## Database Abstraction Layer

The `database.js` file provides a unified interface for all database operations. This abstraction allows seamless migration from localStorage to MySQL in the future.

### Key Features:
- **Single point of data access** - All HTML files use the same `db` object
- **Consistent API** - Same methods work for both localStorage and MySQL
- **Easy migration** - Change one variable to switch database types
- **No code changes needed** - HTML files remain unchanged during migration

## Data Structure

### 1. Faculty
```javascript
{
    facultyId: "FAC001",
    password: "faculty123",
    name: "Dr. John Smith",
    department: "cse"
}
```

**Default Users:**
- Faculty ID: `FAC001`, Password: `faculty123`
- Faculty ID: `FAC002`, Password: `faculty123`
- Faculty ID: `admin`, Password: `admin123`

### 2. Students
```javascript
{
    studentId: "STU001",
    password: "student123",
    name: "Student 1",
    department: "cse",
    semester: 1,
    section: "A1"
}
```

**Default Users:**
- 100 sample students (STU001 to STU100)
- All passwords: `student123`

### 3. Classes
```javascript
{
    classKey: "cse-1-A1-cs-501",
    department: "cse",
    semester: 1,
    section: "A1",
    course: "cs-501",
    courseName: "Theory of Computation",
    totalStudents: 58
}
```

### 4. Attendance Records
```javascript
{
    date: "2025-10-24T12:00:00Z",
    totalStudents: 58,
    present: 45,
    absent: 13,
    percentage: "77.59",
    scannedStudents: ["STU001", "STU002", ...]
}
```

## API Methods

### Authentication
```javascript
await db.authenticateFaculty(facultyId, password)
await db.authenticateStudent(studentId, password)
```

### Class Data
```javascript
db.getClassData(department, semester, section, course)
db.getAllClasses()
```

### Attendance
```javascript
db.saveAttendanceRecord(classKey, record)
db.getAttendanceHistory(classKey)
db.saveStudentAttendance(studentId, classKey, date, status)
db.getStudentAttendance(studentId, classKey)
```

### Utility
```javascript
db.exportData()  // Export all data for migration
db.importData(data)  // Import data
db.clearAllData()  // Clear all localStorage
```

## Migration to MySQL

### Step 1: Setup MySQL Database

1. Install MySQL Server
2. Run the SQL schema:
```bash
mysql -u root -p < schema.sql
```

### Step 2: Update database.js

Uncomment the MySQL methods and update the constructor:

```javascript
constructor() {
    this.storageType = 'mysql';  // Change from 'localStorage'
}

async connectMySQL(config) {
    const mysql = require('mysql2/promise');
    this.connection = await mysql.createConnection(config);
    this.storageType = 'mysql';
}
```

### Step 3: Add MySQL Configuration

Create a config file or add directly:

```javascript
// In database.js or separate config
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'smart_attendance'
};

// Initialize connection
await db.connectMySQL(mysqlConfig);
```

### Step 4: Update Method Implementations

The MySQL query methods are already prepared in `database.js`. Just uncomment them:

```javascript
async mysqlQuery(query, params = []) {
    try {
        const [results] = await this.connection.execute(query, params);
        return { success: true, data: results };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

### Step 5: Migrate Existing Data

If you have existing localStorage data:

```javascript
// Export current data
const data = db.exportData();

// Save to JSON file
console.log(JSON.stringify(data, null, 2));

// After MySQL setup, import the data
// You'll need to write SQL INSERT statements for the exported data
```

## File Structure

```
smart-attendance-app/
├── database.js          # Database abstraction layer
├── schema.sql          # MySQL database schema
├── DATABASE_README.md  # This file
├── facultyLogin.html   # Faculty login page
├── studentLogin.html   # Student login page
├── facultyDashboard.html
├── markAttendance.html
├── showAnalytics.html
└── style.css
```

## Benefits of This Approach

1. **Zero breaking changes** - HTML files don't need updates during migration
2. **Gradual migration** - Can test MySQL while keeping localStorage as backup
3. **Type safety** - Consistent data structure across storage types
4. **Easy rollback** - Switch back to localStorage anytime
5. **Data export** - Can export localStorage data before migration

## Testing

### Test localStorage (Current):
1. Open any HTML file in browser
2. Open DevTools → Application → Local Storage
3. See data stored under your domain

### Test MySQL (After Migration):
1. Change `storageType` to `'mysql'`
2. Add MySQL connection code
3. Test each operation
4. Verify data in MySQL:
```sql
SELECT * FROM faculty;
SELECT * FROM students;
SELECT * FROM attendance;
```

## Future Enhancements

- Add password hashing (bcrypt)
- Add session management
- Add role-based access control
- Add API endpoints for mobile apps
- Add real-time updates (WebSockets)
- Add data analytics dashboard
- Add export to Excel/PDF

## Security Notes

⚠️ **Important for Production:**
- Hash passwords (currently plaintext)
- Use prepared statements (already implemented for MySQL)
- Add input validation
- Implement HTTPS
- Add rate limiting
- Use environment variables for DB credentials
- Add SQL injection protection (done via parameterized queries)

## Support

For issues or questions about database migration, refer to:
- `database.js` - Full implementation
- `schema.sql` - Complete MySQL schema
- This README - Migration guide

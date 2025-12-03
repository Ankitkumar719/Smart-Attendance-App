# Quick Start Guide

## Login Page

### Unified Login
Open `index.html` - Single login page for all users

**Select your role:**
- 👨‍🏫 Faculty
- 👨‍🎓 Student  
- 🔐 Admin

**Test Accounts:**

| Role | ID | Password |
|------|----|---------|
| Faculty | `FAC001` | `faculty123` |
| Faculty | `FAC002` | `faculty123` |
| Student | `STU001` - `STU100` | `student123` |
| Admin | `admin` | `admin123` |

## How to Use

### For Faculty:

1. **Login** → Use faculty credentials
2. **Dashboard** → Choose "Mark Attendance" or "Show Analytics"

#### Mark Attendance:
1. Select: Department, Semester, Section, Course
2. Click **Search Students** → See total student count
3. Click **Generate QR Code** → QR code appears
4. Click **Simulate Student Scan** → Test attendance marking
5. Click **Close & Save Attendance** → Save to database

#### Show Analytics:
1. Select: Department, Semester, Section, Course
2. Click **Search Analytics**
3. View: Total students, classes conducted, average attendance, class-wise breakdown

### For Students:
1. **Login** → Use student credentials (automatically redirects to dashboard)
2. **Dashboard** → View attendance statistics (Average, Total Classes, Lowest)

#### Scan QR Code:
1. Wait for faculty to generate QR code in class
2. Enter any text in QR input (simulates scanning)
3. Click **Submit Attendance**
4. See confirmation message

#### My Attendance:
1. Switch to "📊 My Attendance" tab
2. View class-wise attendance breakdown
3. See percentage, present/absent counts
4. Color-coded status (Good: Green, Average: Orange, Low: Red)

## Database Structure

### Current: localStorage
- All data stored in browser's localStorage
- Open DevTools → Application → Local Storage to view

### Data Tables:
1. **faculty** - Faculty accounts
2. **students** - Student accounts  
3. **classes** - Course/class information
4. **attendanceHistory** - Class attendance records
5. **studentAttendance** - Individual student records

## MySQL Migration (Future)

When ready to switch to MySQL:

1. Run `schema.sql` in MySQL
2. Edit `database.js` line 6:
   ```javascript
   this.storageType = 'mysql'; // Change from 'localStorage'
   ```
3. Uncomment MySQL connection code
4. Add your MySQL credentials
5. Done! No HTML changes needed

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | **Unified login for Faculty/Student/Admin** |
| `facultyLogin.html` | (Legacy) Faculty authentication |
| `studentLogin.html` | (Legacy) Student authentication |
| `facultyDashboard.html` | Faculty menu |
| `studentDashboard.html` | **Student menu with QR scanner & stats** |
| `markAttendance.html` | QR generation & attendance marking |
| `showAnalytics.html` | Attendance reports |
| `database.js` | **Database abstraction layer** |
| `schema.sql` | MySQL database schema |
| `style.css` | Modern UI styling |

## Key Features

✅ Faculty & student authentication  
✅ **Student Dashboard** with QR scanner  
✅ **Attendance statistics** - Average, Total, Lowest  
✅ **Class-wise attendance breakdown** for students  
✅ Fixed student counts per class  
✅ QR code generation for attendance  
✅ Real-time attendance tracking (30 min QR validity)  
✅ Attendance analytics & reports  
✅ Database abstraction for easy MySQL migration  
✅ Modern, responsive UI with gradient cards  
✅ Export/import data functionality

## Default Class Data

| Class Key | Department | Semester | Section | Course | Students |
|-----------|------------|----------|---------|--------|----------|
| cse-1-A1-cs-501 | CSE | 1 | A1 | CS-501 | 58 |
| cse-1-A2-cs-501 | CSE | 1 | A2 | CS-501 | 55 |
| cse-2-A1-cse-502 | CSE | 2 | A1 | CSE-502 | 62 |
| cse-aids-3-A1-cse-503 | CSE-AIDS | 3 | A1 | CSE-503 | 48 |
| cse-cs-4-A2-cse-504 | CSE-CS | 4 | A2 | CSE-504 | 51 |

## Browser Console Commands

Open DevTools → Console and try:

```javascript
// Export all data
db.exportData()

// Clear all data
db.clearAllData()

// Get specific class data
db.getClassData('cse', '1', 'A1', 'cs-501')

// Get attendance history
db.getAttendanceHistory()

// Get all classes
db.getAllClasses()
```

## Troubleshooting

### Data not saving?
- Check browser's localStorage is enabled
- Clear cache and reload
- Check console for errors

### Login not working?
- Verify credentials (case-sensitive)
- Check `database.js` is loaded
- Open console and run: `db.getLocalData('faculty')`

### Analytics showing no data?
- Mark attendance first using "Mark Attendance" page
- Click "Close & Save Attendance" to store data
- Then check analytics

## Next Steps

1. ✅ Open `index.html` - The unified login page
2. ✅ Test with different roles (Faculty/Student/Admin)
3. ✅ Mark attendance for different classes
4. ✅ View student dashboard and faculty analytics
5. ✅ Export data: `db.exportData()`
6. 🔄 When ready: Migrate to MySQL using `schema.sql`

## Support

For detailed database migration guide, see `DATABASE_README.md`

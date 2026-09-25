# WEB-01 Smart Campus Issue Management

## 🏫 Hackathon Project

### Problem Statement

**WEB-01 – Smart Campus Issue Management**

In a college campus, students frequently face problems such as Wi-Fi failures, electrical issues, water leakage, classroom maintenance problems, and other infrastructure-related issues.

Currently, reporting and tracking these issues can be difficult because complaints may be communicated verbally or through informal channels. This can lead to:

- Delayed issue reporting
- Difficulty in tracking complaint status
- Lack of transparency for students
- Difficulty for administrators to manage multiple complaints
- No centralized system for monitoring campus issues

### Proposed Solution

**Smart Campus Issue Management** is a web-based platform that provides a centralized system for students and administrators to report, manage, track, and resolve campus issues.

Students can submit complaints with details such as:

- Issue title
- Category
- Location
- Description
- Priority

Administrators can view reported issues, filter and search complaints, and update the issue status.

### Key Features

- 📝 Student Issue Reporting
- 📍 Issue Location Tracking
- 🏷️ Issue Category & Priority
- 🔄 Issue Status Management
- 🔎 Search and Filter Issues
- 📊 Admin Dashboard
- 👨‍🎓 Student Portal
- 💾 Centralized Issue Data Management

---

## 🏗️ System Architecture / Flow Chart

```mermaid
flowchart TD
    A[Student] --> B[Student Portal]

    B --> C[Report Campus Issue]

    C --> D[Issue Details]
    D --> D1[Title]
    D --> D2[Category]
    D --> D3[Location]
    D --> D4[Description]
    D --> D5[Priority]

    D1 --> E[Issue Management System]
    D2 --> E
    D3 --> E
    D4 --> E
    D5 --> E

    E --> F[Admin Dashboard]

    F --> G[View Issues]
    F --> H[Search & Filter]
    F --> I[Update Issue Status]

    I --> J[Pending]
    I --> K[In Progress]
    I --> L[Resolved]

    J --> M[Student Portal]
    K --> M
    L --> M

    M --> N[Student Can Track Issue Status]

## 👥 Team Details

**Team Name:** Tech Titans

**Team Members:**
- Naseem Khan R
- Jeevan K

**College:** SNS College of Technology
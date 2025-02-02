# Property Rental and Purchase Application

A full-stack web application that allows users to post, browse, and manage rental and purchase properties. Users can submit reviews, rate properties, and delete their listings.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Frontend

- **React.js** - Frontend framework for building user interfaces.
- **Next.js** - React framework for server-side rendering and static site generation.
- **TypeScript** - Superset of JavaScript that adds static typing.
- **Tailwind CSS** - Utility-first CSS framework for fast UI development.

### Backend

- **Flask** - JavaScript runtime environment for the backend server.

## Setup Instructions

### Prerequisites

Ensure you have the following is installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)

### Clone the Repository

```bash
git clone https://github.com/your-username/property-rent-purchase.git
cd property-rent-purchase
```

### File Structure
```bash
property-rent-purchase/
├── backend/
│   ├── models/              # Flask models (Property, Review)
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── components/          # React components (PropertyCard, ReviewForm, etc.)
│   ├── pages/               # Next.js pages (Home, Property Listing, etc.)
│   ├── styles/              # Tailwind CSS configuration
│   ├── .env.local           # Environment variables for frontend
│   ├── next.config.js       # Next.js configuration
│   └── package.json         # Frontend dependencies
└── README.md                # This file
```
### Contributing
Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.

1.Fork the repository

2.Create a new branch (git checkout -b feature-name)

3.Make your changes

4.Commit your changes (git commit -m 'Add new feature')

5.Push your changes (git push origin feature-name)

6.Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


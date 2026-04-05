#  E-Commerce Management System (EMS)

A full-stack **E-Commerce Management System** built with **Spring Boot (Backend)** and **Angular (Frontend)**.  
This project demonstrates modern enterprise-level architecture including **REST APIs, JWT authentication, OAuth2 security, and responsive UI design**.

---

## 🧱 Tech Stack

### 🔹 Backend (Spring Boot)
- Java 17
- Spring Boot 3.3.5
- Spring Data JPA (Hibernate)
- Spring Security + OAuth2 Authorization Server
- JWT Authentication
- MySQL Database
- Lombok
- Maven

### 🔹 Frontend (Angular)
- Angular 19
- Angular Material
- Tailwind CSS
- RxJS
- Chart.js
- FontAwesome

---

## 📦 Features

### 🔐 Authentication & Security
- JWT-based authentication
- OAuth2 Authorization Server
- Secure REST APIs

### 👨‍💼 Product Management
- List the available products
- View product details
- add Products to Cart and Payment checkout with Paypal

### 📊 Dashboard
- Data visualization using charts
- Real-time updates

### 📧 Email Integration
- Email notifications using Jakarta Mail

### 💳 Additional Features
- PayPal integration (frontend)


---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

1. Clone the repository
```bash
git clone https://github.com/youssefrhd/ems-project.git
cd ems-project
```

2. Configure MySQL in `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

3. Run the application
```bash
mvn spring-boot:run
```

---

### 🔹 Frontend Setup

1. Navigate to frontend
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Run Angular app
```bash
ng serve
```

4. Open browser:
```
http://localhost:4200
```

---

## 🔑 API Authentication Flow

1. User logs in  
2. Backend generates JWT token  
3. Token is sent with each request  
4. Spring Security validates token   

---

## 🧪 Testing

Run backend tests:
```bash
mvn test
```

Run frontend tests:
```bash
ng test
```

---

## 📈 Future Improvements

- Docker containerization  
- CI/CD pipeline integration  
- Microservices architecture  
- Advanced analytics dashboard  
- Mobile app integration  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project  
2. Create a new branch  
3. Commit your changes  
4. Open a Pull Request  


---

## 👨‍💻 Author

**Youssef El Rhadir**  
- GitHub: https://github.com/youssefrhd  
- Email: elrhadiry1@gmail.com  

---

## ⭐ Final Note

This project is designed to reflect **real-world enterprise development practices**, combining:

- Clean architecture  
- Secure authentication  
- Scalable backend  
- Modern frontend UI  


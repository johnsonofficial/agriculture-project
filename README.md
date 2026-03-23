 🌾 AgriAssist Ecosystem

AgriAssist is a modern, full-stack digital ecosystem designed to empower farmers and agricultural stakeholders with data-driven insights and streamlined management tools. Built with a focus on performance, scalability, and user experience.

[**Live Demo**](https://johnsonofficial.github.io/agriculture-project)

---

## 🚀 Tech Stack

This project leverages a cutting-edge frontend architecture for a fast, responsive, and type-safe development experience.

### Core Frameworks
* **React 18**: Component-based UI library.
* **TypeScript**: Static typing for robust code and better developer experience.
* **Vite**: Next-generation frontend tooling for lightning-fast builds.

### UI & Styling
* **Tailwind CSS**: Utility-first CSS framework for rapid styling.
* **Shadcn/UI**: Beautifully designed components built on top of **Radix UI** primitives.
* **Lucide React**: Clean and consistent iconography.
* **Framer Motion / Tailwind Animate**: Smooth transitions and interactive elements.

### Data & State Management
* **TanStack Query (React Query)**: Powerful asynchronous state management for fetching and caching data.
* **Supabase**: Backend-as-a-Service (BaaS) providing a PostgreSQL database and authentication.
* **Zod**: TypeScript-first schema validation for forms and API responses.
* **React Hook Form**: Performant, flexible, and extensible forms.

---

## 📦 Key Features

* **Interactive Data Visualization**: Real-time agricultural metrics and trends using **Recharts**.
* **Dynamic Dashboard**: Responsive layouts utilizing **React Resizable Panels**.
* **Advanced Form Handling**: Multi-step agricultural data inputs with validation.
* **Modern Navigation**: Accessible and intuitive menus via **Radix UI Navigation Menu**.
* **Responsive Tables & Lists**: Optimized for viewing on mobile, tablet, and desktop.

---

## 🛠️ Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** or **bun**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/johnsonofficial/agriculture-project.git
    cd agriculture-project
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

---

## 🏗️ Project Structure

```text
├── src
│   ├── components   # Reusable UI components (Shadcn + Custom)
│   ├── hooks        # Custom React hooks (Data fetching, logic)
│   ├── lib          # Utility functions and shared configurations
│   ├── pages        # Main application views/routes
│   ├── App.tsx      # Main application entry and routing
│   └── main.tsx     # Root entry point
├── public           # Static assets
└── tailwind.config.js
```

---

## 🚀 Deployment

The project is configured for automated deployment to **GitHub Pages**.

To deploy the latest version:
```bash
npm run deploy
```
*Note: This runs `vite build` followed by `gh-pages` to push the `dist` folder to your repository.*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License.

Would you like me to add a specific section for **API Documentation** or detailed **User Guides**?

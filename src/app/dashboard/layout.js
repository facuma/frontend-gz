
export default function DashboardLayout({ children }) {
    // Aquí puedes verificar la autenticación
    const isAuthenticated = true; // Implementa tu lógica de autenticación
  
    if (!isAuthenticated) {
      return <div>No tienes acceso a esta página</div>;
    }
  
    return (
      <div className="dashboard-layout bg-gray-100 min-h-screen">
        {children}
      </div>
    );
  }
  
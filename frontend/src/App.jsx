import React, { useState, useEffect, useCallback } from 'react';
import { Home, BarChart2, Newspaper, Users, Settings, Plus, Edit, Trash2, Search, Bell, UserCircle, X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

// --- Reusable UI Components ---

// Custom Modal for Confirmations and Alerts
const CustomModal = ({ isOpen, onClose, title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel", type = "confirmation" }) => {
  if (!isOpen) return null;

  const IconComponent = type === "danger" ? AlertTriangle : type === "success" ? CheckCircle : Info;
  const iconColor = type === "danger" ? "text-red-500" : type === "success" ? "text-green-500" : "text-blue-500";
  const confirmButtonColor = type === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-100">
        <div className="flex flex-col items-center text-center">
          <IconComponent className={`w-16 h-16 mb-4 ${iconColor}`} />
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 mb-8 text-sm">{message}</p>
        </div>
        <div className={`flex ${type === "alert" ? "justify-center" : "justify-between"} space-x-4`}>
          {type !== "alert" && (
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200 w-full sm:w-auto"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={type === "alert" ? onClose : onConfirm}
            className={`px-6 py-3 text-white rounded-lg ${confirmButtonColor} font-semibold transition-colors duration-200 w-full sm:w-auto shadow-md hover:shadow-lg`}
          >
            {type === "alert" ? "OK" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};


// Navigation Item Component
const NavItem = ({ icon: Icon, label, isActive, onClick, className = '' }) => (
  <button
    className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all duration-200 group
      ${isActive ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}
      ${className}`}
    onClick={onClick}
  >
    <Icon className={`w-5 h-5 mr-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
    <span className="font-medium">{label}</span>
  </button>
);

// Stat Card Component
const StatCard = ({ title, value, description, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
  };
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border-l-4 border-${color}-500`}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          {Icon && <Icon className={`w-8 h-8 text-${color}-500 opacity-70`} />}
        </div>
        <p className="text-4xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">{description}</p>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Confirmation Modal State
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    type: 'confirmation' // 'confirmation', 'danger', 'success', 'alert'
  });

  const showConfirmation = useCallback((title, message, onConfirm, confirmText = "Confirm", type = "confirmation") => {
    setConfirmationModal({ isOpen: true, title, message, onConfirm, confirmText, type });
  }, []);

  const closeConfirmation = useCallback(() => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }));
  }, []);


  useEffect(() => {
    document.body.style.minHeight = '100vh';
    document.body.style.fontFamily = 'Inter, sans-serif';
    document.body.classList.add('bg-gray-100'); // Ensure bg is on body for full effect
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter antialiased">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-200 px-4">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity">
            FlowAdmin
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem icon={Home} label="Dashboard" isActive={currentPage === 'dashboard'} onClick={() => handlePageChange('dashboard')} />
          <NavItem icon={BarChart2} label="Stocks" isActive={currentPage === 'stocks'} onClick={() => handlePageChange('stocks')} />
          <NavItem icon={Newspaper} label="News" isActive={currentPage === 'news'} onClick={() => handlePageChange('news')} />
          <NavItem icon={Users} label="Users" isActive={currentPage === 'users'} onClick={() => handlePageChange('users')} />
          <NavItem icon={Settings} label="Settings" isActive={currentPage === 'settings'} onClick={() => handlePageChange('settings')} />
        </nav>
        <div className="p-4 border-t border-gray-200 lg:hidden">
            <NavItem icon={X} label="Close Menu" isActive={false} onClick={() => setIsSidebarOpen(false)} />
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 sm:px-6 shadow-sm sticky top-0 z-30">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-11 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64 lg:w-80 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <UserCircle className="w-8 h-8 text-gray-600 hover:text-blue-600" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {(() => {
            switch (currentPage) {
              case 'dashboard':
                return <Dashboard />;
              case 'stocks':
                return <StocksPage showConfirmation={showConfirmation} closeConfirmation={closeConfirmation} />;
              case 'news':
                return <NewsPage showConfirmation={showConfirmation} closeConfirmation={closeConfirmation} />;
              case 'users':
                return <UsersPage showConfirmation={showConfirmation} closeConfirmation={closeConfirmation} />;
              case 'settings':
                return <SettingsPage />;
              default:
                return <Dashboard />;
            }
          })()}
        </main>
      </div>
      <CustomModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmation}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirm={() => {
            confirmationModal.onConfirm();
            closeConfirmation();
        }}
        confirmText={confirmationModal.confirmText}
        type={confirmationModal.type}
      />
    </div>
  );
};


// --- Page Components ---

// Dashboard Page Component
const Dashboard = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-800">Welcome to FlowAdmin</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Stocks" value="2,500" description="Managed in the system" icon={BarChart2} color="blue" />
      <StatCard title="Published News" value="1,230" description="Articles live today" icon={Newspaper} color="green"/>
      <StatCard title="Active Users" value="450" description="Logged in last 24h" icon={Users} color="yellow"/>
      <StatCard title="Pending Approvals" value="15" description="News articles awaiting review" icon={AlertTriangle} color="purple"/>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity Feed</h3>
        <ul className="space-y-4 text-gray-700">
          {/* Example activity items - make these more dynamic in a real app */}
          <li className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>John Doe published "Tech Stock Surge" - <span className="text-xs text-gray-500">2 min ago</span></span>
          </li>
          <li className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <Edit className="w-5 h-5 text-blue-500" />
            <span>Jane Smith updated "AAPL" stock data - <span className="text-xs text-gray-500">15 min ago</span></span>
          </li>
          <li className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5 text-purple-500" />
            <span>New user registered: Alex Green - <span className="text-xs text-gray-500">1 hour ago</span></span>
          </li>
          <li className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-500" />
            <span>System backup completed successfully - <span className="text-xs text-gray-500">3 hours ago</span></span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats Overview</h3>
        <p className="text-gray-700 mb-4">Visual representation of key metrics.</p>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center text-gray-500 italic p-4">
          {/* Placeholder for Chart - In a real app, use a library like Recharts or Chart.js */}
          Chart Area: Stock Performance Trends
        </div>
         <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
            View Detailed Report
        </button>
      </div>
    </div>
  </div>
);


// Stocks Page Component
const StocksPage = ({ showConfirmation }) => {
  const [stocks, setStocks] = useState([
    { id: 1, symbol: 'AAPL', company: 'Apple Inc.', exchange: 'NASDAQ', price: '175.00', change: '+1.20 (0.69%)', industry: 'Technology', description: 'Designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.' },
    { id: 2, symbol: 'GOOGL', company: 'Alphabet Inc.', exchange: 'NASDAQ', price: '150.50', change: '-0.80 (0.53%)', industry: 'Technology', description: 'Provides online advertising services, search engine technology, cloud computing, and software and hardware products.' },
    { id: 3, symbol: 'MSFT', company: 'Microsoft Corp.', exchange: 'NASDAQ', price: '420.20', change: '+2.50 (0.60%)', industry: 'Technology', description: 'Develops, licenses, and supports software, services, devices, and solutions.' },
    { id: 4, symbol: 'AMZN', company: 'Amazon.com Inc.', exchange: 'NASDAQ', price: '185.70', change: '+0.90 (0.49%)', industry: 'E-commerce', description: 'Engages in the retail sale of consumer products and subscriptions in North America and internationally.' },
    { id: 5, symbol: 'TSLA', company: 'Tesla Inc.', exchange: 'NASDAQ', price: '170.10', change: '-3.10 (1.80%)', industry: 'Automotive', description: 'Designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);

  const openModal = (stock = null) => {
    setCurrentStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStock(null);
  };

  const handleSaveStock = (stockData) => {
    if (currentStock && currentStock.id) {
      setStocks(stocks.map(s => s.id === stockData.id ? stockData : s));
      showConfirmation("Success!", "Stock has been updated successfully.", () => {}, "OK", "success");
    } else {
      const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
      setStocks([...stocks, { ...stockData, id: newId, change: stockData.change || 'N/A' }]);
      showConfirmation("Success!", "New stock has been added successfully.", () => {}, "OK", "success");
    }
    closeModal();
  };

  const handleDeleteStock = (id) => {
    showConfirmation(
      "Confirm Deletion",
      "Are you sure you want to delete this stock? This action cannot be undone.",
      () => {
        setStocks(stocks.filter(stock => stock.id !== id));
         showConfirmation("Deleted!", "The stock has been successfully deleted.", () => {}, "OK", "alert");
      },
      "Delete",
      "danger"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Manage Stocks</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Stock
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              {['Symbol', 'Company Name', 'Exchange', 'Last Price', 'Change', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stock.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.exchange}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">${stock.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal(stock)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-all duration-200"
                    title="Edit Stock"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStock(stock.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                    title="Delete Stock"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {stocks.length === 0 && <p className="text-center py-8 text-gray-500">No stocks found. Add a new stock to get started!</p>}
      </div>

      {isModalOpen && (
        <StockFormModal
          stock={currentStock}
          onSave={handleSaveStock}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

// Stock Form Modal Component (Enhanced Styling)
const StockFormModal = ({ stock, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    symbol: stock?.symbol || '',
    company: stock?.company || '',
    exchange: stock?.exchange || '',
    industry: stock?.industry || '',
    description: stock?.description || '',
    price: stock?.price || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...stock, ...formData });
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{stock ? 'Edit Stock Details' : 'Add New Stock'}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form fields with enhanced styling */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">Ticker Symbol</label>
            <input type="text" id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="exchange" className="block text-sm font-medium text-gray-700 mb-1">Exchange</label>
              <input type="text" id="exchange" name="exchange" value={formData.exchange} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Current Price ($)</label>
              <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input type="text" id="industry" name="industry" value={formData.industry} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className={`${inputClass} min-h-[80px]`}></textarea>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto"
            >
              {stock ? 'Save Changes' : 'Add Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// News Page Component
const NewsPage = ({ showConfirmation }) => {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Global Markets Rally on Strong Earnings', author: 'Jane Doe', date: '2024-05-20', status: 'Published', content: 'Detailed content about market rally...' },
    { id: 2, title: 'Tech Sector Faces Regulatory Scrutiny', author: 'John Smith', date: '2024-05-19', status: 'Draft', content: 'Insights into tech regulations...' },
    { id: 3, title: 'Oil Prices Stabilize Amidst Geopolitical Tensions', author: 'Alice Brown', date: '2024-05-18', status: 'Published', content: 'Analysis of oil price stability...' },
    { id: 4, title: 'Cryptocurrency Volatility Continues to Make Waves', author: 'Bob White', date: '2024-05-17', status: 'Published', content: 'Exploring crypto market trends...' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const openModal = (article = null) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
  };

  const handleSaveArticle = (articleData) => {
    if (currentArticle && currentArticle.id) {
      setArticles(articles.map(a => a.id === articleData.id ? articleData : a));
      showConfirmation("Success!", "Article has been updated successfully.", () => {}, "OK", "success");
    } else {
      const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
      setArticles([...articles, { ...articleData, id: newId }]);
      showConfirmation("Success!", "New article has been added successfully.", () => {}, "OK", "success");
    }
    closeModal();
  };

  const handleDeleteArticle = (id) => {
     showConfirmation(
      "Confirm Deletion",
      "Are you sure you want to delete this news article? This action cannot be undone.",
      () => {
        setArticles(articles.filter(article => article.id !== id));
        showConfirmation("Deleted!", "The article has been successfully deleted.", () => {}, "OK", "alert");
      },
      "Delete",
      "danger"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Manage News Articles</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Article
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Title', 'Author', 'Date', 'Status', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate" title={article.title}>{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{article.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal(article)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-all duration-200"
                    title="Edit Article"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p className="text-center py-8 text-gray-500">No articles found. Add a new article to get started!</p>}
      </div>

      {isModalOpen && (
        <ArticleFormModal
          article={currentArticle}
          onSave={handleSaveArticle}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

// Article Form Modal Component (Enhanced Styling)
const ArticleFormModal = ({ article, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    author: article?.author || '',
    date: article?.date || new Date().toISOString().split('T')[0],
    content: article?.content || '',
    status: article?.status || 'Draft',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...article, ...formData });
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white";
  const selectClass = `${inputClass} appearance-none`; // For custom arrow if needed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{article ? 'Edit News Article' : 'Add New Article'}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
              <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Article Content</label>
            <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="6" className={`${inputClass} min-h-[120px]`} required></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className={selectClass}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto"
            >
              {article ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Users Page Component
const UsersPage = ({ showConfirmation }) => {
  // Mock user data - in a real app, this would come from an API/state management
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Wonderland', email: 'alice.wonder@example.com', role: 'Administrator', joined: '2023-01-15', avatar: UserCircle },
    { id: 2, name: 'Bob The Builder', email: 'bob.builder@example.com', role: 'Editor', joined: '2023-03-22', avatar: UserCircle },
    { id: 3, name: 'Charlie Chaplin', email: 'charlie.c@example.com', role: 'Viewer', joined: '2023-05-10', avatar: UserCircle },
    { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Editor', joined: '2024-02-01', avatar: UserCircle },
  ]);

  // Dummy function for edit action
  const handleEditUser = (userId) => {
    showConfirmation("Edit User", `This would open a form to edit user ID: ${userId}. (Functionality not implemented in this demo)`, () => {}, "OK", "alert");
  };

  // Dummy function for delete action
  const handleDeleteUser = (userId) => {
     showConfirmation(
      "Confirm Deletion",
      `Are you sure you want to delete user ID: ${userId}? This action cannot be undone.`,
      () => {
        setUsers(users.filter(user => user.id !== userId));
        showConfirmation("User Deleted", `User ID: ${userId} has been successfully deleted.`, () => {}, "OK", "alert");
      },
      "Delete",
      "danger"
    );
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
         <button
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-300 transform hover:scale-105"
          onClick={() => showConfirmation("Add User", "This would open a form to add a new user. (Functionality not implemented in this demo)", () => {}, "OK", "alert")}
        >
          <Plus className="w-5 h-5 mr-2" /> Add New User
        </button>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['User', 'Email Address', 'Role', 'Joined Date', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {/* Placeholder for avatar image - replace with actual image if available */}
                      <user.avatar className="h-10 w-10 rounded-full text-gray-400 bg-gray-200 p-1" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.role === 'Administrator' ? 'bg-red-100 text-red-800' :
                      user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-all duration-200"
                    title="Edit User"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center py-8 text-gray-500">No users found.</p>}
      </div>
    </div>
  );
};

// Settings Page Component
const SettingsPage = () => {
  const [settings, setSettings] = useState({
    apiKey: '********************',
    notifications: 'Enabled',
    theme: 'Light',
    language: 'English (US)'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSettings(prev => ({...prev, [name]: value}));
  }

  const handleSaveChanges = () => {
    // Simulate API call
    console.log("Settings saved:", settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  const inputGroupClass = "mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white";
  const selectClass = `${inputClass} appearance-none`;


  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Application Settings</h2>

      {showSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md mb-6" role="alert">
          <div className="flex">
            <div className="py-1"><CheckCircle className="h-6 w-6 text-green-500 mr-3"/></div>
            <div>
              <p className="font-bold">Settings Saved!</p>
              <p className="text-sm">Your changes have been successfully applied.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className={inputGroupClass}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">API Configuration</h3>
          <label htmlFor="api-key" className={labelClass}>API Key</label>
          <input type="password" id="api-key" name="apiKey" value={settings.apiKey} onChange={handleChange} className={inputClass} />
          <p className="text-xs text-gray-500 mt-1">Your unique key for accessing external services.</p>
        </div>

        <div className={inputGroupClass}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Notification Preferences</h3>
          <label htmlFor="notifications" className={labelClass}>Email Notifications</label>
          <select id="notifications" name="notifications" value={settings.notifications} onChange={handleChange} className={selectClass}>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
            <option value="CriticalOnly">Critical Alerts Only</option>
          </select>
           <p className="text-xs text-gray-500 mt-1">Choose how you want to receive updates.</p>
        </div>

        <div className={inputGroupClass}>
           <h3 className="text-lg font-semibold text-gray-800 mb-3">Appearance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="theme" className={labelClass}>Interface Theme</label>
                    <select id="theme" name="theme" value={settings.theme} onChange={handleChange} className={selectClass}>
                        <option>Light</option>
                        <option>Dark (Coming Soon)</option>
                        <option>System Default</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="language" className={labelClass}>Language</label>
                    <select id="language" name="language" value={settings.language} onChange={handleChange} className={selectClass}>
                        <option>English (US)</option>
                        <option>Español</option>
                        <option>Français</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-300 transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

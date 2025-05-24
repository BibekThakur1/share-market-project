import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Newspaper, Users, Settings, Plus, Edit, Trash2, Search, Bell, UserCircle, X } from 'lucide-react';

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  // Ensure body has a minimum height for full page layout
  useEffect(() => {
    document.body.style.minHeight = '100vh';
    document.body.style.fontFamily = 'Inter, sans-serif'; // Set Inter font globally
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex-col w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">StockAdmin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={Home} label="Dashboard" isActive={currentPage === 'dashboard'} onClick={() => { setCurrentPage('dashboard'); setIsSidebarOpen(false); }} />
          <NavItem icon={BarChart2} label="Stocks" isActive={currentPage === 'stocks'} onClick={() => { setCurrentPage('stocks'); setIsSidebarOpen(false); }} />
          <NavItem icon={Newspaper} label="News" isActive={currentPage === 'news'} onClick={() => { setCurrentPage('news'); setIsSidebarOpen(false); }} />
          <NavItem icon={Users} label="Users" isActive={currentPage === 'users'} onClick={() => { setCurrentPage('users'); setIsSidebarOpen(false); }} />
          <NavItem icon={Settings} label="Settings" isActive={currentPage === 'settings'} onClick={() => { setCurrentPage('settings'); setIsSidebarOpen(false); }} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
            <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer hover:text-blue-600" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* Render content based on currentPage state */}
          {(() => {
            switch (currentPage) {
              case 'dashboard':
                return <Dashboard />;
              case 'stocks':
                return <Stocks />;
              case 'news':
                return <News />;
              case 'users':
                return <UsersPage />;
              case 'settings':
                return <SettingsPage />;
              default:
                return <Dashboard />;
            }
          })()}
        </main>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-all duration-200
      ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span>{label}</span>
  </button>
);

// Dashboard Page Component
const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Stocks" value="2,500" description="Managed in the system" />
      <StatCard title="Published News" value="1,230" description="Articles live today" />
      <StatCard title="Active Users" value="450" description="Logged in last 24h" />
      <StatCard title="Pending Approvals" value="15" description="News articles awaiting review" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <ul className="space-y-3 text-gray-700">
          <li>• John Doe published "Tech Stock Surge"</li>
          <li>• Jane Smith updated "AAPL" stock data</li>
          <li>• New user registered: Alex Green</li>
          <li>• System backup completed</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
        <p className="text-gray-700">This section would typically display charts or graphs related to stock performance, user engagement, or content trends.</p>
        <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center text-gray-400 mt-4">
          [Placeholder for Chart]
        </div>
      </div>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <p className="text-sm text-gray-500 mt-3">{description}</p>
  </div>
);

// Stocks Page Component
const Stocks = () => {
  const [stocks, setStocks] = useState([
    { id: 1, symbol: 'AAPL', company: 'Apple Inc.', exchange: 'NASDAQ', price: '175.00', change: '+1.20 (0.69%)' },
    { id: 2, symbol: 'GOOGL', company: 'Alphabet Inc.', exchange: 'NASDAQ', price: '150.50', change: '-0.80 (0.53%)' },
    { id: 3, symbol: 'MSFT', company: 'Microsoft Corp.', exchange: 'NASDAQ', price: '420.20', change: '+2.50 (0.60%)' },
    { id: 4, symbol: 'AMZN', company: 'Amazon.com Inc.', exchange: 'NASDAQ', price: '185.70', change: '+0.90 (0.49%)' },
    { id: 5, symbol: 'TSLA', company: 'Tesla Inc.', exchange: 'NASDAQ', price: '170.10', change: '-3.10 (1.80%)' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(null); // For editing

  const openModal = (stock = null) => {
    setCurrentStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStock(null);
  };

  const handleSaveStock = (stockData) => {
    if (currentStock) {
      // Update existing stock
      setStocks(stocks.map(s => s.id === stockData.id ? stockData : s));
    } else {
      // Add new stock
      const newId = Math.max(...stocks.map(s => s.id)) + 1;
      setStocks([...stocks, { id: newId, ...stockData, change: 'N/A' }]);
    }
    closeModal();
  };

  const handleDeleteStock = (id) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      setStocks(stocks.filter(stock => stock.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Manage Stocks</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Stock
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stock.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stock.exchange}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stock.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stock.change}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal(stock)}
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200"
                    title="Edit Stock"
                  >
                    <Edit className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDeleteStock(stock.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Delete Stock"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

// Stock Form Modal Component
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
    onSave({ ...stock, ...formData }); // Merge existing ID if editing
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{stock ? 'Edit Stock' : 'Add New Stock'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="exchange" className="block text-sm font-medium text-gray-700 mb-1">Exchange</label>
            <input
              type="text"
              id="exchange"
              name="exchange"
              value={formData.exchange}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors duration-200"
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
const News = () => {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Global Markets Rally on Strong Earnings', author: 'Jane Doe', date: '2024-05-20', status: 'Published' },
    { id: 2, title: 'Tech Sector Faces Regulatory Scrutiny', author: 'John Smith', date: '2024-05-19', status: 'Draft' },
    { id: 3, title: 'Oil Prices Stabilize Amidst Geopolitical Tensions', author: 'Alice Brown', date: '2024-05-18', status: 'Published' },
    { id: 4, title: 'Cryptocurrency Volatility Continues', author: 'Bob White', date: '2024-05-17', status: 'Published' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null); // For editing

  const openModal = (article = null) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
  };

  const handleSaveArticle = (articleData) => {
    if (currentArticle) {
      // Update existing article
      setArticles(articles.map(a => a.id === articleData.id ? articleData : a));
    } else {
      // Add new article
      const newId = Math.max(...articles.map(a => a.id)) + 1;
      setArticles([...articles, { id: newId, ...articleData }]);
    }
    closeModal();
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Manage News Articles</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Article
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{article.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{article.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal(article)}
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200"
                    title="Edit Article"
                  >
                    <Edit className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

// Article Form Modal Component
const ArticleFormModal = ({ article, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    author: article?.author || '',
    date: article?.date || new Date().toISOString().split('T')[0], // Default to today
    content: article?.content || '',
    status: article?.status || 'Draft',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...article, ...formData }); // Merge existing ID if editing
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{article ? 'Edit Article' : 'Add New Article'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors duration-200"
            >
              {article ? 'Save Changes' : 'Add Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Users Page Component
const UsersPage = () => {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Administrator' },
    { id: 2, name: 'Content Editor', email: 'editor@example.com', role: 'Editor' },
    { id: 3, name: 'Viewer Account', email: 'viewer@example.com', role: 'Viewer' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200"
                    title="Edit User"
                  >
                    <Edit className="w-5 h-5 inline" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Settings Page Component
const SettingsPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-700">This section would contain various application settings, such as API keys, notification preferences, user roles and permissions, and general app configurations.</p>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <input
            type="text"
            id="api-key"
            value="********************"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
          />
        </div>
        <div>
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
          <select
            id="notifications"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors duration-200">
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

export default App;

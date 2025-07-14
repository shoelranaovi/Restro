import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  Clock,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
  Image,
} from "lucide-react";
import BlogModal from "./Modal";

const RestaurantBlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    status: "Draft",
    featuredImage: "",
    publishDate: "",
  });

  // Dummy blog data
  const dummyBlogPosts = [
    {
      id: 1,
      title: "The Secret Behind Our Signature Pasta",
      slug: "secret-behind-signature-pasta",
      excerpt:
        "Discover the traditional Italian techniques and premium ingredients that make our pasta dishes truly exceptional.",
      content:
        "Our signature pasta is crafted using age-old Italian techniques passed down through generations. We use only the finest semolina flour, fresh eggs from local farms, and hand-roll each piece to perfection. The secret lies in our 24-hour resting process that allows the dough to develop its unique texture and flavor.",
      author: "Chef Marco Rossi",
      category: "Recipes",
      tags: "pasta, italian, cooking, chef-secrets",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
      publishDate: "2025-06-20",
      createdAt: "6/20/2025",
      views: 1247,
      comments: 23,
    },
    {
      id: 2,
      title: "Farm-to-Table: Our Local Ingredient Journey",
      slug: "farm-to-table-local-ingredient-journey",
      excerpt:
        "Learn about our commitment to sourcing the freshest ingredients from local farms and how it impacts our menu.",
      content:
        "At our restaurant, we believe that great food starts with great ingredients. That's why we partner with over 15 local farms within a 50-mile radius to source our produce, meats, and dairy products. This farm-to-table approach not only ensures the freshest flavors but also supports our local community and reduces our environmental footprint.",
      author: "Sarah Johnson",
      category: "Sustainability",
      tags: "farm-to-table, local, sustainability, fresh-ingredients",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      publishDate: "2025-06-18",
      createdAt: "6/18/2025",
      views: 892,
      comments: 17,
    },
    {
      id: 3,
      title: "Wine Pairing Guide: Perfect Matches for Your Meal",
      slug: "wine-pairing-guide-perfect-matches",
      excerpt:
        "Our sommelier shares expert tips on pairing wines with our most popular dishes for an elevated dining experience.",
      content:
        "Wine pairing is an art that can transform your dining experience. Our head sommelier, David Chen, has carefully curated wine selections that complement each dish on our menu. From light whites that enhance our seafood to bold reds that pair perfectly with our steaks, we'll guide you through the perfect wine journey.",
      author: "David Chen",
      category: "Wine & Beverages",
      tags: "wine, pairing, sommelier, dining",
      status: "Draft",
      featuredImage:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
      publishDate: "2025-06-25",
      createdAt: "6/19/2025",
      views: 0,
      comments: 0,
    },
    {
      id: 4,
      title: "Behind the Scenes: A Day in Our Kitchen",
      slug: "behind-scenes-day-in-kitchen",
      excerpt:
        "Take a peek behind the curtain and see what goes into preparing your favorite dishes every day.",
      content:
        "Ever wondered what happens in our kitchen before you arrive? Join us for a behind-the-scenes look at a typical day in our bustling kitchen. From early morning prep work to the dinner rush, our talented team of chefs works tirelessly to ensure every dish meets our high standards.",
      author: "Chef Marco Rossi",
      category: "Behind the Scenes",
      tags: "kitchen, chefs, preparation, daily-operations",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      publishDate: "2025-06-15",
      createdAt: "6/15/2025",
      views: 1456,
      comments: 31,
    },
    {
      id: 5,
      title: "Seasonal Menu Update: Summer Favorites",
      slug: "seasonal-menu-update-summer-favorites",
      excerpt:
        "Explore our new summer menu featuring fresh, light dishes perfect for the warmer months ahead.",
      content:
        "Summer is here, and we're excited to introduce our new seasonal menu! Featuring fresh salads, grilled seafood, and refreshing cocktails, our summer offerings are designed to keep you cool and satisfied. Don't miss our signature gazpacho and the grilled Mediterranean branzino.",
      author: "Emma Wilson",
      category: "Menu Updates",
      tags: "summer, seasonal, menu, fresh, light",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
      publishDate: "2025-06-22",
      createdAt: "6/22/2025",
      views: 743,
      comments: 12,
    },
    {
      id: 6,
      title: "The Art of Dessert Making",
      slug: "art-of-dessert-making",
      excerpt:
        "Our pastry chef reveals the techniques and passion behind our award-winning desserts.",
      content:
        "Desserts are the perfect ending to any meal, and our pastry chef, Isabella Martinez, creates edible works of art that delight both the eyes and the palate. From delicate macarons to rich chocolate soufflés, each dessert is crafted with precision and creativity.",
      author: "Isabella Martinez",
      category: "Desserts",
      tags: "desserts, pastry, chef, techniques, sweet",
      status: "Scheduled",
      featuredImage:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      publishDate: "2025-06-28",
      createdAt: "6/21/2025",
      views: 0,
      comments: 0,
    },
    {
      id: 7,
      title: "Customer Spotlight: Regular Patrons Share Their Stories",
      slug: "customer-spotlight-regular-patrons",
      excerpt:
        "Meet some of our most loyal customers and hear their favorite memories from dining with us.",
      content:
        "Our restaurant is more than just a place to eat – it's a community. Today, we're highlighting some of our most cherished regular customers who have become part of our extended family. Their stories and loyalty inspire us every day to maintain our high standards.",
      author: "Sarah Johnson",
      category: "Community",
      tags: "customers, community, stories, loyalty",
      status: "Draft",
      featuredImage:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400",
      publishDate: "2025-06-30",
      createdAt: "6/23/2025",
      views: 0,
      comments: 0,
    },
    {
      id: 4,
      title: "Behind the Scenes: A Day in Our Kitchen",
      slug: "behind-scenes-day-in-kitchen",
      excerpt:
        "Take a peek behind the curtain and see what goes into preparing your favorite dishes every day.",
      content:
        "Ever wondered what happens in our kitchen before you arrive? Join us for a behind-the-scenes look at a typical day in our bustling kitchen. From early morning prep work to the dinner rush, our talented team of chefs works tirelessly to ensure every dish meets our high standards.",
      author: "Chef Marco Rossi",
      category: "Behind the Scenes",
      tags: "kitchen, chefs, preparation, daily-operations",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      publishDate: "2025-06-15",
      createdAt: "6/15/2025",
      views: 1456,
      comments: 31,
    },
    {
      id: 5,
      title: "Seasonal Menu Update: Summer Favorites",
      slug: "seasonal-menu-update-summer-favorites",
      excerpt:
        "Explore our new summer menu featuring fresh, light dishes perfect for the warmer months ahead.",
      content:
        "Summer is here, and we're excited to introduce our new seasonal menu! Featuring fresh salads, grilled seafood, and refreshing cocktails, our summer offerings are designed to keep you cool and satisfied. Don't miss our signature gazpacho and the grilled Mediterranean branzino.",
      author: "Emma Wilson",
      category: "Menu Updates",
      tags: "summer, seasonal, menu, fresh, light",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
      publishDate: "2025-06-22",
      createdAt: "6/22/2025",
      views: 743,
      comments: 12,
    },
    {
      id: 6,
      title: "The Art of Dessert Making",
      slug: "art-of-dessert-making",
      excerpt:
        "Our pastry chef reveals the techniques and passion behind our award-winning desserts.",
      content:
        "Desserts are the perfect ending to any meal, and our pastry chef, Isabella Martinez, creates edible works of art that delight both the eyes and the palate. From delicate macarons to rich chocolate soufflés, each dessert is crafted with precision and creativity.",
      author: "Isabella Martinez",
      category: "Desserts",
      tags: "desserts, pastry, chef, techniques, sweet",
      status: "Scheduled",
      featuredImage:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      publishDate: "2025-06-28",
      createdAt: "6/21/2025",
      views: 0,
      comments: 0,
    },
    {
      id: 7,
      title: "Customer Spotlight: Regular Patrons Share Their Stories",
      slug: "customer-spotlight-regular-patrons",
      excerpt:
        "Meet some of our most loyal customers and hear their favorite memories from dining with us.",
      content:
        "Our restaurant is more than just a place to eat – it's a community. Today, we're highlighting some of our most cherished regular customers who have become part of our extended family. Their stories and loyalty inspire us every day to maintain our high standards.",
      author: "Sarah Johnson",
      category: "Community",
      tags: "customers, community, stories, loyalty",
      status: "Draft",
      featuredImage:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400",
      publishDate: "2025-06-30",
      createdAt: "6/23/2025",
      views: 0,
      comments: 0,
    },
    {
      id: 8,
      title: "Holiday Catering: Planning Your Perfect Event",
      slug: "holiday-catering-planning-perfect-event",
      excerpt:
        "Planning a holiday event? Learn about our catering services and how we can make your celebration memorable.",
      content:
        "The holiday season is approaching, and we want to help make your celebrations special. Our catering team can handle events of all sizes, from intimate family gatherings to large corporate parties. We offer customizable menus and full-service options to suit your needs.",
      author: "Michael Thompson",
      category: "Catering",
      tags: "catering, holidays, events, planning, celebration",
      status: "Published",
      featuredImage:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
      publishDate: "2025-06-12",
      createdAt: "6/12/2025",
      views: 567,
      comments: 8,
    },
  ];

  useEffect(() => {
    setBlogPosts(dummyBlogPosts);
    setFilteredPosts(dummyBlogPosts);
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter((post) => post.status === statusFilter);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, blogPosts]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const openModal = (type, post = null) => {
    setModalType(type);
    setSelectedPost(post);

    if (type === "create") {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        tags: "",
        status: "Draft",
        featuredImage: "",
        publishDate: "",
      });
    } else if (type === "edit" && post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: post.tags,
        status: post.status,
        featuredImage: post.featuredImage,
        publishDate: post.publishDate,
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      status: "Draft",
      featuredImage: "",
      publishDate: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "create") {
      const newPost = {
        id: blogPosts.length + 1,
        ...formData,
        tags: formData.tags,
        createdAt: new Date().toLocaleDateString("en-US"),
        views: 0,
        comments: 0,
      };
      setBlogPosts((prev) => [newPost, ...prev]);
    } else if (modalType === "edit") {
      setBlogPosts((prev) =>
        prev.map((post) =>
          post.id === selectedPost.id ? { ...post, ...formData } : post
        )
      );
    }

    closeModal();
  };

  const handleDelete = (postId) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== postId));
    closeModal();
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
      setSelectAll(false);
    } else {
      setSelectedPosts(currentPosts.map((post) => post.id));
      setSelectAll(true);
    }
  };

  const handleSelectPost = (postId) => {
    if (selectedPosts.includes(postId)) {
      const newSelected = selectedPosts.filter((id) => id !== postId);
      setSelectedPosts(newSelected);
      setSelectAll(false);
    } else {
      const newSelected = [...selectedPosts, postId];
      setSelectedPosts(newSelected);
      if (newSelected.length === currentPosts.length) {
        setSelectAll(true);
      }
    }
  };

  // Reset selection when page or filters change
  useEffect(() => {
    setSelectedPosts([]);
    setSelectAll(false);
  }, [currentPage, searchTerm, statusFilter]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">
                Manage your restaurant blog posts, stories, and updates
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                Import
              </button>
              <button
                onClick={() => openModal("create")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Post
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Archived</option>
            </select>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    POST
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    AUTHOR & CATEGORY
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    STATUS
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    PERFORMANCE
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    PUBLISH DATE
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">
                            {truncateText(post.excerpt, 80)}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Tag className="w-3 h-3" />
                            <span>
                              {post.tags.split(",").slice(0, 2).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {post.author}
                          </span>
                        </div>
                        <div className="text-gray-500">{post.category}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          post.status
                        )}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()} views</span>
                        </div>
                        <div className="text-gray-500">
                          {post.comments} comments
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="text-gray-500">
                          Created: {post.createdAt}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal("view", post)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Post"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("edit", post)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("delete", post)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredPosts.length)} of{" "}
              {filteredPosts.length} results
            </div>
            {selectedPosts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedPosts.length} selected
                </span>
                <button
                  onClick={() => {
                    // Bulk delete functionality
                    setBlogPosts((prev) =>
                      prev.filter((post) => !selectedPosts.includes(post.id))
                    );
                    setSelectedPosts([]);
                    setSelectAll(false);
                  }}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BlogModal
          modalType={modalType}
          closeModal={closeModal}
          selectedPost={selectedPost}
          formData={formData}
          handleDelete={handleDelete}
          handleInputChange={handleInputChange}
          formatDate={formatDate}
          handleSubmit={handleSubmit}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

export default RestaurantBlogManagement;

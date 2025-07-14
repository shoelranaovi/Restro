import { Image, Trash2, X } from "lucide-react";

function BlogModal({
  modalType,
  closeModal,
  selectedPost,
  formData,
  handleDelete,
  handleInputChange,
  formatDate,
  handleSubmit,
  getStatusColor 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {modalType === "create" && "Create New Blog Post"}
            {modalType === "view" && "View Blog Post"}
            {modalType === "edit" && "Edit Blog Post"}
            {modalType === "delete" && "Delete Blog Post"}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {modalType === "view" && selectedPost && (
            <div className="space-y-6">
              {selectedPost.featuredImage && (
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedPost.featuredImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.category}</span>
                  <span>•</span>
                  <span>{formatDate(selectedPost.publishDate)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      selectedPost.status
                    )}`}
                  >
                    {selectedPost.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  {selectedPost.excerpt}
                </p>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Tags: {selectedPost.tags}</span>
                    <span>•</span>
                    <span>{selectedPost.views} views</span>
                    <span>•</span>
                    <span>{selectedPost.comments} comments</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {modalType === "delete" && selectedPost && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Blog Post
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedPost.title}"? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedPost.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}

          {(modalType === "create" || modalType === "edit") && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="URL slug (auto-generated)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Recipes">Recipes</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Wine & Beverages">Wine & Beverages</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Menu Updates">Menu Updates</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Community">Community</option>
                    <option value="Catering">Catering</option>
                    <option value="Events">Events</option>
                    <option value="News">News</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Comma-separated tags"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Date *
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {formData.featuredImage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-full h-full hidden items-center justify-center text-gray-400">
                      <Image className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {modalType === "create" ? "Create Post" : "Update Post"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogModal;

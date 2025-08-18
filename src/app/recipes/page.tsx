'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { 
  Recipe, 
  CreateRecipeData, 
  getRecipes, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe, 
  searchRecipes, 
  getCategories 
} from '@/lib/recipes';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newRecipe, setNewRecipe] = useState<CreateRecipeData>({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cook_time: '',
    servings: 1,
    category: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const filterRecipes = useCallback(async () => {
    try {
      if (searchTerm || selectedCategory) {
        const filtered = await searchRecipes(searchTerm, selectedCategory);
        setFilteredRecipes(filtered);
      } else {
        setFilteredRecipes(recipes);
      }
    } catch (err) {
      console.error('Error filtering recipes:', err);
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, selectedCategory, recipes]);

  // Load recipes on component mount
  useEffect(() => {
    loadRecipes();
  }, []);

  // Filter recipes when search term or category changes
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipes();
      setRecipes(data);
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const addInstruction = () => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => i === index ? value : inst)
    }));
  };

  const removeIngredient = (index: number) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const removeInstruction = (index: number) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const recipeData = {
        ...newRecipe,
        ingredients: newRecipe.ingredients.filter(ing => ing.trim() !== ''),
        instructions: newRecipe.instructions.filter(inst => inst.trim() !== '')
      };

      if (editingRecipe) {
        // Update existing recipe
        await updateRecipe({ ...recipeData, id: editingRecipe.id });
        setEditingRecipe(null);
      } else {
        // Create new recipe
        await createRecipe(recipeData);
      }
      
      // Reload recipes to get updated data
      await loadRecipes();
      resetForm();
    } catch (err) {
      setError('Failed to save recipe');
      console.error(err);
    }
  };

  const resetForm = () => {
    setNewRecipe({
      title: '',
      description: '',
      ingredients: [''],
      instructions: [''],
      cook_time: '',
      servings: 1,
      category: ''
    });
    setShowAddForm(false);
    setEditingRecipe(null);
  };

  const handleEdit = (recipe: Recipe) => {
    setNewRecipe({
      title: recipe.title,
      description: recipe.description || '',
      ingredients: [...recipe.ingredients],
      instructions: [...recipe.instructions],
      cook_time: recipe.cook_time || '',
      servings: recipe.servings,
      category: recipe.category || ''
    });
    setEditingRecipe(recipe);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id);
        await loadRecipes();
      } catch (err) {
        setError('Failed to delete recipe');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <div className="pt-8 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">Recipe Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, create, and share amazing recipes with our cooking community
            </p>
          </motion.div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="py-4 bg-red-50 border-l-4 border-red-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <div className="text-red-700">
                <span className="font-medium">Error:</span> {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Recipe Form */}
      {showAddForm && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
                    <input
                      type="text"
                      required
                      value={newRecipe.title}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter recipe title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={newRecipe.category}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Italian, Dessert, Vegetarian"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Brief description of the recipe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time</label>
                    <input
                      type="text"
                      value={newRecipe.cook_time || ''}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, cook_time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 30 mins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                    <input
                      type="number"
                      min="1"
                      value={newRecipe.servings}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="e.g., 2 cups flour"
                        />
                        {newRecipe.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="text-red-600 hover:text-red-700 px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newRecipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                          {index + 1}
                        </span>
                        <textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          rows={2}
                          placeholder="Describe this step..."
                        />
                        {newRecipe.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="text-red-600 hover:text-red-700 px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    {editingRecipe ? 'Update Recipe' : 'Save Recipe'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recipes Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              <p className="mt-4 text-gray-600">Loading recipes...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''}
                </h2>
                {searchTerm && (
                  <p className="text-gray-600">Showing results for &quot;{searchTerm}&quot;</p>
                )}
              </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border"
              >
                <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                  <span className="text-6xl">🍽️</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
                    {recipe.category && (
                      <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">
                        {recipe.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{recipe.description || 'No description available'}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>🕒 {recipe.cook_time || 'N/A'}</span>
                    <span>👥 {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                        <li key={i}>• {ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-gray-400">+ {recipe.ingredients.length - 3} more...</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

              {filteredRecipes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first recipe!'}
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add Recipe
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

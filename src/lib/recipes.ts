import { supabase } from './supabase';

export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  cook_time: string | null;
  servings: number;
  category: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateRecipeData {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cook_time?: string;
  servings: number;
  category?: string;
  image_url?: string;
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
  id: number;
}

// Get all recipes
export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }

  return data || [];
}

// Get recipe by ID
export async function getRecipeById(id: number): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }

  return data;
}

// Create a new recipe
export async function createRecipe(recipeData: CreateRecipeData): Promise<Recipe> {
  const { data, error } = await supabase
    .from('recipes')
    .insert({
      ...recipeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating recipe:', error);
    throw new Error('Failed to create recipe');
  }

  return data;
}

// Update an existing recipe
export async function updateRecipe(recipeData: UpdateRecipeData): Promise<Recipe> {
  const { id, ...updateData } = recipeData;
  
  const { data, error } = await supabase
    .from('recipes')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating recipe:', error);
    throw new Error('Failed to update recipe');
  }

  return data;
}

// Delete a recipe
export async function deleteRecipe(id: number): Promise<void> {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting recipe:', error);
    throw new Error('Failed to delete recipe');
  }
}

// Search recipes
export async function searchRecipes(searchTerm: string, category?: string): Promise<Recipe[]> {
  let query = supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes');
  }

  return data || [];
}

// Get unique categories
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('category')
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = Array.from(new Set(data.map(item => item.category).filter(Boolean)));
  return categories;
}


import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches all clients from the database
 */
export const fetchAllClients = async () => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

/**
 * Fetches a single client by ID
 */
export const fetchClientById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching client by id:', error);
    return null;
  }
};

/**
 * Tests the connection to the clients table
 */
export const testClientsConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error testing clients connection:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error testing clients connection:', error);
    return false;
  }
};
